const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Newsletter = require('../../models/Newsletter');

// route post   api/newsletters
// description  post new newsletter
// access       private

router.post('/', [auth, [
    check('email', 'E-mail is required')
    .not()
    .isEmpty()
]], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {email} = req.body;

        try{
        
            const user = await User.findById(req.user.id).select('-password');
            if(user){

                const newsFields = {}
                newsFields.user= req.user.id;
                newsFields.name= user.name;
                newsFields.avatar= user.avatar;
                if(email) newsFields.email = email.split(', ').map(email=>email.trim());

                let newsletter = await Newsletter.findOne({user: req.user.id });
                if(newsletter){
                    newsletter = await Newsletter.findOneAndUpdate({user: req.user.id}, {$set:newsFields}, {new: true})
                
                    return res.json(newsletter);
                }
                newsletter = new Newsletter(newsFields);
                await newsletter.save();
                res.json(newsletter);
            }
            else{
                const newEmail = new Newsletter({
                    email: req.body.email
                });
                const newsletter = await newEmail.save()
                return res.json(newsletter)
            }
            
            
        }
        catch(err){
            console.error(err.message);
            res.status(500).send('Server error.');
        }
});
// route get    api/newsletters
// description  get all newsletter emails
// access       private
router.get('/', async(req, res) => {
    try{
        const newsletters = await Newsletter.find().sort({date:-1});
        res.json(newsletters);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }
})

// route get    api/newsletters
// description  newsletter by id
// access       private
router.get('/:id', auth, async(req, res) => {
    
    try{
        const newsletter = await Newsletter.findById(req.params.id).sort({date: -1});
        if(newsletter.user.toString() !== req.user.id){
            return res.status(400).json({msg: 'User not authorised.'})
        }
        res.json(newsletter);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }
});

// route delete api/newsletters
// description  remove from the newsletter
// access       private
router.delete('/:id', auth, async(req, res) => {
    
    try{
        const newsletter = await Newsletter.findById(req.params.id);
        await newsletter.remove();
        res.json('E-mail removed from newsletter.');
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }
});

// route post   api/newsletters
// description  post guests newsletter
// access       public

router.post('/guest', [
    check('email', 'E-mail is required')
    .not()
    .isEmpty()
], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {email, name} = req.body;

        try{
        
            const newsletter = await Newsletter.findOne(({email}))
            if(newsletter){
                return res.status(400).json({msg: 'Email already exists.'})
            }
            newsletter = new Newsletter({
                name: req.body.name,
                email: req.body.email
            })
            await newsletter.save();
            res.json(newsletter);
        }
        catch(err){
            console.error(err.message);
            res.status(500).send('Server error.');
        }
});

module.exports = router;


