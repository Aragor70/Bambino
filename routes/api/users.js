const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');


const User = require('../../models/User');
const Notification = require('../../models/Notification');

//route POST   api/users
//description  register user
//access       public
router.post('/', [
    check('name', 'Name is required with 2-22 characters.')
    .not()
    .isEmpty()
    .isLength({min:2, max:22}),
    check('email', 'Include valid E-mail address.')
    .isEmail(),
    check('password', 'Put the password with 6 or more characters.')
    .isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const {name, email, password} = req.body;

    try{
        // if user exists
        let user = await User.findOne(({email}))
        if(user){
            return res.status(400).json({ errors: [ { msg: 'User already exists.' } ] })
        }

        // get users gravatar
        const avatar = gravatar.url(email, {
            s: '200', r: 'pg', d: 'mm'
        //  size, rating, default image
        });
        

        user = new User({
            name,
            email,
            avatar,
            password
        });

        // encrypt password using bcrypt
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // welcome notify
        let notify = new Notification({
            user: user.id,
            service: {
                user: user.id,
                from: 'OnLoud service',
                text: `Welcome in onLoud ${user.name}.`
            }
        })
        await notify.save()
        // return jsonwebtoken

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
        
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }
    
});

//route POST   api/users
//description  edit user data
//access       private
router.post('/:id', [auth, [
    check('name', 'Name is required.')
    .not()
    .isEmpty(),
    check('email', 'E-mail is required.')
    .not()
    .isEmpty(),
]], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const {name, email} = req.body;
    
    const userFields = {};

    userFields.user = req.user.id;
    if(name) userFields.name = name;
    if(email) userFields.email = email;
    
    
    try {
        
        let user = await User.findById({_id: req.user.id})
        if(user){
            userFields.avatar=user.avatar;
            userFields.password=user.password;
            user = await User.findByIdAndUpdate({_id:req.params.id}, userFields, {new: true});
        }
        await user.save()
        return res.json(user);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }

});

//route POST   api/users/password/:id
//description  edit password by user id
//access       private
router.post('/password/:id', [auth, [
    check('password', 'Password is required.')
    .isLength({ min: 6 })
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({msg: 'There was an error.'})
    }

    const {password, repPassword} = req.body;
    try{
        if(req.user.id !== req.params.id){
            return res.status(400).json({msg: 'User not found.'})
        }
        let user = await User.findById(req.user.id);
        if(!user){
            return res.status(400).json({msg: 'User not found.'})
        }
        if(password !== repPassword){
            return res.status(400).json({msg: 'Passwords are not the same.'})
        }

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);
        

        await user.save();
        res.json(user)
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }

});

//route GET    api/users/:id
//description  get single user
//access       private
router.get('/:id', auth, async (req, res) => {
    try{
        const user = await User.findById(req.params.id).select('-password');
        
        res.json(user);

    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Auth server error.')
    }
});

//route GET    api/users
//description  get all users
//access       private
router.get('/', auth, async (req, res) => {
    try{
        const users = await User.find().select('-password');
        
        res.json(users);

    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Auth server error.')
    }
});

module.exports = router;