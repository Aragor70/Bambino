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


//route get    api/auth
//description  test route
//access       public
router.get('/', auth, async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        
        res.json(user);

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

    const {email, password} = req.body;

    try{
        // if user exists
        let user = await User.findOne(({email}));
        if(!user){
            return res.status(400).json({ errors: [ { msg: 'Invalid Credentials.' } ] })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({ errors: [ { msg: 'Invalid Credentials.' } ] })
        }

        /* 
        // send notification
        await appMailer.applicationNotify({
            email: email.toLowerCase(),
            data: {name: user.name.toLowerCase()}
        }) */


       /*  sgMail.setApiKey('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');
        const msg = {
          to: email,
          from: 'mikey.prus@gmail.com',
          subject: 'Bambino',
          text: 'Ciao bambino'
        };
        sgMail.send(msg); */


        // return jsonwebtoken

        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 },
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
            await profile.save()
        }

        /* const application = {
            'name': user.name,
            'email': email.toLowerCase(),
            'message': req.body.message
        }
        await User.create(application) */


        
        

    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }
    
});

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
    Hi ${user.name},\n \n 
    You are receiving this email, because you (or someone else) requested to reset of a password. 
    <b>Please click the address below to reset the password:</b> \n \n 
    ${resetUrl} \n \n 
    If you did not request a password reset, then please ignore this email or reply to let us know. \n
    This password reset is only valid for the next 10 minutes. \n \n
    Thank you, \n
    Mikołaj: OnLoud.uk team \n
    `;
    // ${req.protocol}://${req.get('host')}/api/auth/resetpassword/${resetToken}
    try {
        /* await sendEmail({
            email: user.email,
            subject: 'OnLoad reset password.',
            message
        }) */ 

        sgMail.setApiKey('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');
        const msg = {
          to: user.email,
          from: 'mikey.prus@gmail.com',
          subject: 'OnLoad reset password.',
          text: message
        };
        sgMail.send(msg);


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