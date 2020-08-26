const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');

const User = require('../../models/User');
const Post = require('../../models/Post');

//route post   api/posts
//description  post the posts
//access       private
router.post('/', [auth, [
    check('title', 'Title is required.')
    .not()
    .isEmpty(),
    check('text', 'Song text is required')
    .not()
    .isEmpty()
]], async(req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    try{
        const user = await User.findById( req.user.id ).select('-password');

        const newPost = new Post({
            user: user.id,
            name: user.name, 
            avatar: user.avatar, 
            title: req.body.title,  
            text: req.body.text, 
            image: req.body.image
        });
        const post = await newPost.save();
        res.json(post);


    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }

});

//route get    api/posts
//description  all posts by users
//access       private

router.get('/', auth, async(req, res) => {
    try{
        const post = await Post.find().sort({ date: -1});
        if(!post){
           return res.status(400).json({ msg: 'There is no post.'});
        }
        res.json(post);
    }
    catch(err){
        console.log(err.message);
        res.status(500).send('Server error.');
    }
});

//route get    api/posts
//description  get post by id
//access       private

router.get('/:id', auth, async(req, res) => {
    try{
        const post = await Post.findById( req.params.id ).sort({ date: -1});
        if(!post){
           return res.status(400).json({ msg: 'Post not found.'});
        }
        res.json(post);
    }
    catch(err){
        console.log(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({ msg: 'Post not found.'});
        }
        res.status(500).send('Server error.');
    }
});

//route delete api/posts
//description  delete post by Id
//access       private

router.delete('/:id', auth, async(req, res) => {
    try{
        const post = await Post.findById( req.params.id );
        if(!post){
           return res.status(400).json({ msg: 'There is no post.'});
        }
        // check user
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'User not authorised.'})
        }
        await post.remove();
        res.json('Post removed.');
    }
    catch(err){
        console.log(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({ msg: 'Post not found.' });
        }
        res.status(500).send('Server error.');
    }
});

//route put    api/posts/like/:id
//description  Like a post
//access       private

router.put('/like/:id', auth, async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);

        // check if this post has already been liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({ msg: 'Post already liked.'});
        }

        post.likes.unshift({ user: req.user.id });

        await post.save();

        res.json(post.likes);

    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.')
    }
});

//route put    api/posts/unlike/:id
//description  Unlike a post
//access       private

router.put('/unlike/:id', auth, async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);

        // check if this post has already been liked
        if(!post.likes.some(like => like.user.toString() === req.user.id)){
            return res.status(400).json({ msg: 'Post has not yet been liked.'});
        }

        // remove user id from the likes
        post.likes = post.likes.filter(({user}) => user.toString() !== req.user.id)

        await post.save();

        res.json(post.likes);

    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }
});

//route post   api/posts/comment/:id
//description  comment post
//access       private
router.post('/comment/:id', [auth, [
    check('text', 'Comment text is required.')
    .not()
    .isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        const user = await User.findById(req.user.id).select('-password');

        const post = await Post.findById(req.params.id);

        const newComment = {
            user: req.user.id,
            name: user.name,
            avatar: user.avatar,
            text: req.body.text
        }
        post.comments.unshift(newComment);
        await post.save();
        res.json(post.comments);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }
    
});

//route delete api/posts/comment/:id/:comment_id
//description  delete comment
//access       private
router.delete('/comment/:id/:comment_id', auth, async(req, res) => {
    try{
        const post = await Post.findById(req.params.id);

        // pull out comment
        const comment = post.comments.find(comment=> comment.id === req.params.comment_id);

        // if comment not exists
        if(!comment){
            return res.status(404).json({ msg: 'Comment does not exist.'});
        }

        // check user
        if(comment.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'User not authorised.'});
        }

        // remove comment
        post.comments = post.comments.filter(({id}) => id !== req.params.comment_id);
        await post.save();

        res.json(post.comments);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }
});

// route put        api/posts/view/:id
// description      add view to the post by id
// access           private
router.put('/view/:id', auth, async(req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        post.views.unshift({user: req.user.id, post: req.params.id});
        await post.save();
        res.json(post.views);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }  
});

module.exports = router;