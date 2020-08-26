const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const moment = require('moment')

const User = require('../../models/User');
const Song = require('../../models/Song');
const Author = require('../../models/Author');

// route post       api/songs
// description      post song
// access           public

router.post('/', [auth, [
    check('title', 'Title is required.')
    .not()
    .isEmpty(),
    check('author', 'Author is required.')
    .not()
    .notEmpty(),
    check('text', 'Text is required.')
    .not()
    .isEmpty(),
    check('language', 'Language is required.')
    .not()
    .isEmpty(),
    check('publicationYear', 'Publication year is required.')
    .not()
    .isEmpty()
]], async(req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    try{
        const author = await Author.findById(req.body.author);

        
        const songs = await Song.find().sort({date: -1});

        const authorSongs = songs.filter(song => song.author == author.author)

        const exist = authorSongs.filter(title => title.title.toLowerCase() == req.body.title.toLowerCase());
        if(exist[0]){
            return res.status(400).json({msg: 'Title already exists.'});
        }
        
        const user = await User.findById(req.user.id).select('-password');
        
        const title = req.body.title.charAt(0).toUpperCase() + req.body.title.slice(1);
        const album = req.body.album.charAt(0).toUpperCase() + req.body.album.slice(1);

        const newSong = new Song({
            user: user.id,
            name: user.name,
            avatar: user.avatar,
            title: title,
            author: author.author,
            text: req.body.text,
            album: album,
            publicationYear: req.body.publicationYear,
            category: req.body.category,
            language: req.body.language,
            video: req.body.video
        });
        const song = await newSong.save();

        if(album){
            const albumExist = author.albums.filter(a => a.album.toString() == album )
            
            if(albumExist.length == 0){
                
                const newAlbum = {
                    user: user.id,
                    name: user.name,
                    avatar: user.avatar,
                    album: album,
                    year: req.body.publicationYear
                }

                author.albums.unshift(newAlbum);
                await author.save();
            }
        }

        res.json(song);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }

});
router.post('/edit/:id', [auth, [
    check('title', 'Title is required.')
    .not()
    .isEmpty(),
    check('author', 'Author is required.')
    .not()
    .notEmpty(),
    check('text', 'Text is required.')
    .not()
    .isEmpty(),
    check('language', 'Language is required.')
    .not()
    .isEmpty(),
    check('publicationYear', 'Year is required.')
    .not()
    .isEmpty()
]], async(req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const {text, album, language, category, publicationYear, video} = req.body;

    let songFields = {};
    if(text) songFields.text = req.body.text;
    if(album) songFields.album = req.body.album;
    if(language) songFields.language = req.body.language;
    if(category) songFields.category = req.body.category;
    if(publicationYear) songFields.publicationYear = req.body.publicationYear;
    if(video) songFields.video = req.body.video;

    try{
        let song = await Song.findById(req.params.id);
        if(!song){
            return res.status(400).json({msg: 'Song not found.'});
        }
        
        const user = await User.findById(req.user.id).select('-password');
        if(!user){
            return res.status(400).json({msg: 'User not authorised.'});
        }
        const author = await Author.findOne({author:req.body.author});
        
        const title = req.body.title.charAt(0).toUpperCase() + req.body.title.slice(1);

        const songs = await Song.find().sort({date: -1});

        const authorSongs = songs.filter(song => song.author == author.author && song._id.toString() !== req.params.id)
        
        const exist = authorSongs.filter(title => title.title.toLowerCase() == req.body.title.toLowerCase());
        
        if(exist[0]){
            return res.status(400).json({msg: 'Title already exists.'});
        }
        
        if(title) songFields.title = title;
        if(author) songFields.author = author.author;


        song = await Song.findByIdAndUpdate({_id:req.params.id}, songFields, {new:true})

        await song.save()

        if(album){
            const albumExist = author.albums.filter(a => a.album.toString() == album )
            
            if(albumExist.length == 0){
                
                const newAlbum = {
                    user: user.id,
                    name: user.name,
                    avatar: user.avatar,
                    album: album,
                    year: req.body.publicationYear
                }

                author.albums.unshift(newAlbum);
                await author.save();
            }
        }


        res.json(song);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }

});


router.post('/image/:id', auth, async(req, res) => {
    try{
        const file = req.files.file;
         
    
        if(req.files === null){
            return res.status(400).json({msg: 'No file uploaded.'})
        }
        
        let user = await User.findById(req.user.id);
        if(!user){
            return res.status(400).json({msg: 'User not authorised.'})
        }
        let song = await Song.findById(req.params.id);
        if(!song){
            return res.status(400).json({msg: 'Song not found.'})
        }

        //let fileName = file.name;
        //const salt = await bcrypt.genSalt(10);
        //fileName = await bcrypt.hash(fileName, salt);

        const newImage = {
            user: req.user.id,
            image: file.name
        }
        song.images.unshift(newImage);

        file.mv(`./client/uploads/songs/image/${file.name}`, err => {
            if(err){
                console.error(err);
                return res.status(500).send(err);
            }
        });
        await song.save()
        res.json(song);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }

});

// route get        api/songs
// description      get all song
// access           public

router.get('/', async(req, res) => {

    try{
        const song = await Song.find().sort({date: -1});
    if(!song){
        return res.status(400).json({ msg: 'No songs found.'})
    }

    res.json(song)
    }
    catch(err){
        console.log(err.message);
        res.status(500).send('Server error.');
    }
});

// route get        api/songs/:id
// description      get song by id
// access           public

router.get('/:id', async(req,res) => {

    try{
        const song = await Song.findById(req.params.id).sort({ date: -1 });
        if(!song){
            res.status(400).json({ msg: 'No songs found.' })
        }
        res.json(song);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }

});
// route delete     api/songs/:id
// description      delete song by id
// access           private

router.delete('/:id', auth, async(req, res) => {
    try{
        const song = await Song.findById(req.params.id).sort({ date: -1 });

        if(!song){
            res.status(400).json({msg: 'No songs found.'})
        }
        await song.remove();
        res.json('Song removed.')
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.')
    }
});

// route put        api/songs/view/:id
// description      add view to the song by id
// access           private
router.put('/view/:id', auth, async(req, res) => {
    try{
        const song = await Song.findById(req.params.id);
        const author = await Author.findOne({author:song.author})

        song.views.unshift({user: req.user.id, song: req.params.id, author: author._id});

        await song.save();
        res.json(song.views);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }  
});

// route put        api/songs/unview/:id/:viewId
// description      remove view from the song by id
// access           private
router.put('/unview/:id/:viewId', auth, async(req, res) => {
    try{
        const song = await Song.findById(req.params.id);

        
        song.views = await song.views.filter(view => view._id.toString() !== req.params.viewId );        
        

        await song.save();

        res.json(song.views);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }  
});

// route put        api/songs/like/:id
// description      add like to the song by id
// access           private
router.put('/like/:id', auth, async (req, res) => {

    try{
        const song = await Song.findById(req.params.id);

        if(song.likes.filter(like => like.user.toString() === req.user.id).length>0){
            return res.status(400).json({msg: 'Song already liked.'});
        }
        const author = await Author.findOne({author: song.author})

        song.likes.unshift({user: req.user.id, song: req.params.id, author: author._id});

        
        await song.save();
        res.json(song.likes);

    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }
    
});
// route put        api/songs/unlike/:id
// description      remove like to the song by id
// access           private
router.put('/unlike/:id', auth, async (req, res) => {

    try{
        let song = await Song.findById(req.params.id);

        if(song.likes.filter(like => like.user.toString() === req.user.id).length===0){
            return res.status(400).json({msg: 'Song has not yet been liked.'});
        }
        song.likes = song.likes.filter(like => like.user.toString() !== req.user.id);

        await song.save();
        res.json(song.likes);
        
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }
    
});

// route post       api/songs/comment/:id
// description      add comment to the song by id
// access           private

router.post('/comment/:id', [auth, [
check('text', 'Text is required.')
.not()
.isEmpty()
]], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try{
        const user = await User.findById(req.user.id).select('-password');
        const song = await Song.findById(req.params.id);

        const newComment = {
            user: req.user.id,
            name: user.name,
            avatar: user.avatar,
            text: req.body.text
            
        }
        song.comments.unshift(newComment);
        await song.save();
        res.json(song.comments);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }
    
});

// route delete     api/songs/comment/:id/:comment_id
// description      remove comment from the song by id and comment_id
// access           private
router.delete('/comment/:id/:comment_id', auth, async(req, res) => {
    try{
        const song = await Song.findById(req.params.id);
        const comment = song.comments.find(comment => comment.id === req.params.comment_id)

        if(!comment){
            res.status(404).json({msg: 'Comment not found.'});
        }
        if(comment.user.toString() !== req.user.id){
            res.status(400).json({msg: 'User not authorised.'});
        }

        song.comments = song.comments.filter(({id}) => id !== req.params.comment_id);

        await song.save();
        return res.json(song.comments);
        
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }
});

module.exports = router;