const express = require('express');
const router = express.Router()

const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');
const User = require('../../models/User');
const Quote = require('../../models/Quote');

router.post('/', [auth, [
    check('content', 'Text is required.')
    .not()
    .isEmpty(),
    check('location', 'Location is required.')
    .not()
    .isEmpty(),
    check('author', 'Author is required.')
    .not()
    .isEmpty()
]], async(req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }


    try{
        const user = await User.findById(req.user.id).select('-password');
        if(!user){
            res.status(400).json({msg: 'User not authorised.'});
        }

        const quote = new Quote({
            user: req.user.id,
            name: user.name,
            avatar: user.avatar,
            content: req.body.content,
            location: req.body.location,
            author: req.body.author
        })
        const newQuote = await quote.save();
        res.json(newQuote)
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }
})

router.get('/', async(req, res) => {
    try{
        const quotes = await Quote.find().sort({date: -1})

        res.json(quotes)
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }
})
router.get('/:id', async(req, res) => {
    try{
        
        const quote = await Quote.findById(req.params.id)

        res.json(quote)
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }
})

router.put('/like/:id', auth, async(req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        if(!user){
            return res.status(400).json({msg: 'User not authorised.'});
        }
        
        let quote = await Quote.findById(req.params.id)
        
        if(quote.likes.filter(like => like.user.toString() == req.user.id).length > 0){
            return res.status(400).json({msg: 'Like already exists.'});
        }
        quote.likes.unshift({user: req.user.id, quote: req.params.id})

        await quote.save()
        res.json(quote.likes)
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }
})
router.put('/unlike/:id', auth, async(req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        if(!user){
            return res.status(400).json({msg: 'User not authorised.'});
        }
        let quote = await Quote.findById(req.params.id);
        if(quote.likes.filter(like => like.user.toString() == req.user.id).length === 0){
            return res.status(400).json({msg: 'Like does not exist.'});
        }
        quote.likes = quote.likes.filter(like => like.user.toString() !== req.user.id)

        await quote.save()

        res.json(quote.likes)
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }
})
module.exports = router