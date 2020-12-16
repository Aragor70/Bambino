const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const auth = require('../../middleware/auth');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const sendEmail = require('../../utils/sendEmail');
const sgMail = require('@sendgrid/mail');

const appMailer = require('../../mailers/appMailer');

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const key = require('../../utils/key');
const Notification = require('../../models/Notification');


//route get    api/auth
//description  test route
//access       private
router.get('/', auth, async (req, res) => {
    try{
        const users = await User.findById(req.user.id).select('-password');
        
        res.json(users);

    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Auth server error.')
    }
});

//route POST   api/auth
//description  authenticate user login and get token
//access       public
router.post('/', [
    check('email', 'E-mail is required.')
    .isEmail(),
    check('password', 'Password is required.')
    .exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // if user exists
        let user = await User.findOne(({ email }));
        if(!user){
            return res.status(400).json({ errors: [ { msg: 'Invalid Credentials.' } ] })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({ errors: [ { msg: 'Invalid Credentials.' } ] })
        }

        
        if (user.twoFactor) {
            sgMail.setApiKey(process.env.SENGRID_KEY);

            const twoFactorKey = await key(6)
            
            user.twoFactorKey = twoFactorKey;

            const address = `${req.protocol}://${req.get('host')}/two_factor/${user._id}?key=${twoFactorKey}`; // <- create token insted of user._id

            const message = `
                Welcome again ${user.name}, please click the button to log in the webSite. \n\n
                ${address}\n\n
                , or paste you two factor key to the browser. \n\n
                ${twoFactorKey}\n\n

                I am glad to see you again. \n\n

                Mikolaj from onLoud.uk

            `;

            const msg = {
                from: 'mikey.prus@gmail.com',
                to: user.email,
                subject: 'Onloud Authorization Process',
                text: message
            }
            await user.save()
            await sgMail.send(msg)
            
            setTimeout(async() => {
                user.twoFactorKey = null;
                await user.save()
            }, 900000)

            return res.json({user: user._id})
        }

        // if regular auth return jsonwebtoken

        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, process.env.jwtSecret, { expiresIn: 360000 },
        (err, token) => {
            if(err) {
                throw err
            }
            res.json({ token }); 
                
        });
        // welcome notify
        let notify = await Notification.findOne({user: user.id})
        
        if(notify && notify.turnOn) {
            const newMessage = {
                user: user.id,
                from: 'OnLoud service',
                text: `Welcome again.`
            }
            
        await notify.service.unshift(newMessage)
        await notify.save()
        }
        

        let profile = await Profile.findOne({user:user.id})
        if(profile){
            const newLog = {
                user: user.id,
                name: user.name,
                avatar: user.avatar
            }
            profile.logs.unshift(newLog)
            
            if(profile.logs.length) {
                profile.logs = await profile.logs.slice(0, 10)
            }

            await profile.save()
        }
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }
    
});

//route PUT    api/auth/two_factor/:id
//description  accept code from email two factor auth
//access       Public
router.put('/two_factor/:id', [
    check('key', 'Key is required')
    .not()
    .isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { id } = req.params;
    try {
        let key = req.body.key.join(',')

        if (!key) {
            return res.status(401).json({msg: 'User not authorised.'})
        }
        const user = await User.findById(id);
        if ( !user ) {
            return res.status(401).json({msg: 'User not authorised.'})
        }
        if ( key.toString() !== user.twoFactorKey.toString() ) {
            
            
            return res.status(401).json({msg: 'User not authorised.'})
        }
        user.twoFactorKey = null;
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, process.env.jwtSecret, { expiresIn: 360000 },
        (err, token) => {
            if(err) {
                throw err
            }
            res.json({ token });
        });
        
        let profile = await Profile.findOne({user:user.id})
        if(profile){
            const newLog = {
                user: user.id,
                name: user.name,
                avatar: user.avatar
            }
            profile.logs.unshift(newLog)
            
            if(profile.logs.length) {
                profile.logs = await profile.logs.slice(0, 10)
            }
            
            await profile.save()
        }
        await user.save()

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error.');
    }
})

//route POST   api/auth/two_factor
//description  two factor request initial two factor authorization process
//access       Private
router.post('/two_factor', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        if(!user) {
            return res.status(401).json({msg: 'Not authorised.'})
        }
        user.twoFactor = !user.twoFactor;
        user.twoFactorKey = null
        await user.save()

        res.json(user)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error.')
    }
})


//route POST   api/users/password
//description  forgot user password process, send email
//access       Public
router.post('/forgotpassword', [
    check('email', 'E-mail is required')
    .isEmail()
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const user = await User.findOne({ email: req.body.email });

    if(!user) {
        return res.status(404).json({msg: 'User not found.'})
    }

    const resetToken = user.getResetPasswordToken();
    
    await user.save({ validateBeforeSave: false })

    // create url for reset
    const resetUrl = `${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`;
    const message = `
    Hi ${user.name},<br /><br /> 
    You are receiving this email, because you (or someone else) requested to reset of a password. <br /> 
    <b>Please click the address below to reset the password:</b> <br /><br /> 
    ${resetUrl} <br /><br /> 
    If you did not request a password reset, then please ignore this email or reply to let us know. <br />
    This password reset is only valid for the next 10 minutes. <br /><br /> 
    Thank you, <br />
    Mikołaj: OnLoud.uk team <br />
    `;
    // ${req.protocol}://${req.get('host')}/api/auth/resetpassword/${resetToken}
    try {
        /* await sendEmail({
            email: user.email,
            subject: 'OnLoad reset password.',
            message
        }) */ 

        sgMail.setApiKey(process.env.SENGRID_KEY);
        const msg = {
          to: user.email,
          from: 'mikey.prus@gmail.com',
          subject: 'OnLoad reset password.',
          html: message
        };
        await sgMail.send(msg);


        /* // send notification
        await appMailer.applicationNotify({
            email: user.email.toLowerCase(),
            data: {name: user.name.toLowerCase()}
        }) */

        res.json('Email sent.')
    }
    catch(err) {
        console.error(err.message);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        res.status(500).json({msg: 'Server error. Email could not be sent.'});
    }
});

router.put('/resetpassword/:resettoken', async (req, res) => {
    
        const {password, repPassword} = req.body
    try {

        if(password !== repPassword){
            return res.status(400).json({ msg: 'Passwords are not the same.' });
        }

        const resetPasswordToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex');

        let user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt:Date.now() }})
        if(!user) {
            return res.status(404).json({ msg: 'User not found.' });
        }

        const salt = await bcrypt.genSalt(10)

        user.password = await bcrypt.hash(req.body.password, salt);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save()
        res.json(user)
    }
    catch(err) {
        console.error(err.message);
        res.status(500).send('Server error.')
    }
});
module.exports = router;