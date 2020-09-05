const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');
const axios = require('axios');
const bcrypt = require('bcryptjs');

const uploadExpress = require('express-fileupload');
const multer = require('multer')
const {v4: uuid} = require('uuid')
const AWS = require('aws-sdk')
const path = require('path')
const multerS3 = require('multer-s3')


const User = require('../../models/User');
const Author = require('../../models/Author');
const Profile = require('../../models/Profile');
const upload = require('../../middleware/upload');

// connect with aws amazon storage
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
})

// route post   api/authors
// description  post new author
// access       private
router.post('/', [auth, [
    check('author', 'Author is required.')
    .not()
    .isEmpty()
]], async(req, res) => {
    const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {author} = req.body;
    try{
        const authors = await Author.find().sort({date: -1});
        const exist = authors.filter(auth => auth.author.toLowerCase() == author.toLowerCase())
        if(exist[0]){
            return res.status(400).json({msg: 'This author already exists.'})
        }

        const user = await User.findById(req.user.id).select('-password');
        const name = author.charAt(0).toUpperCase() + author.slice(1);

        const newAuthor = new Author({
            user: user.id,
            name: user.name,
            avatar: user.avatar,
            author: name,
            nationality: req.body.nationality,
            bio: req.body.bio,
            age: req.body.age,
            genres: req.body.genres,
            instruments: req.body.instruments
        });
        await newAuthor.save();
        res.json(newAuthor);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }

});

// route get    api/authors
// description  get all authors
// access       public
router.get('/', async(req, res) => {
    try{
        const author = await Author.find().sort({date: -1});

        if(!author){
            res.status(400).json({msg: 'Author not found.'});
        }
        res.json(author);

    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.')
    }
});

// route get    api/authors/:id
// description  get all authors
// access       public
router.get('/:id', async(req, res) => {
    try{
        const author = await Author.findById(req.params.id).sort({date: -1});
        if(!author){
            return res.status(400).json({msg: 'Author not found.'})
        }
        
        res.json(author);
        

    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }   
});


// route delete api/authors/:id
// description  delete author by id
// access       private
router.delete('/:id', auth, async(req, res) => {
    try{
        const author = await Author.findById(req.params.id);
        if(!author){
            return res.status(400).json({msg: 'Author not found.'})
        }
        if(author.user.toString() !== req.user.id){
            return res.status(400).json({msg: 'User not authorised.'})
        }
        
        await author.remove();
        res.json('Author removed');

    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }   
});

// route post    api/authors/album
// description  post album
// access       private
router.post('/album/:id', [auth, [
    check('album', 'Name is required.')
    .not()
    .isEmpty(),
    check('year', 'Year is required.')
    .not()
    .isEmpty()
]], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    try{
        const user = await User.findById(req.user.id).select('-password');
        const author = await Author.findById(req.params.id);
        if(!user){
            return res.status(400).json({msg: 'User not authorised.'});
        }
        if(!author){
            return res.status(400).json({msg: 'Author not found.'});
        }
        const albumModel = author.albums.filter(a => a.album.toString().toLowerCase() == req.body.album.toString().toLowerCase());
        if(albumModel[0]){
            return res.status(400).json({msg: 'Album already exists.'});
        }
        const album = req.body.album.charAt(0).toUpperCase() + req.body.album.slice(1);

        const newAlbum = {
            user: user.id,
            name: user.name,
            avatar: user.avatar,
            album: album,
            year: req.body.year
        }
        author.albums.unshift(newAlbum);
        await author.save();
        res.json(author.albums);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.')
    }
});





router.post('/image/:id', auth, upload, async(req, res) => {
        
    try{
        if(!req.files){
            return res.status(400).json({msg: 'File not found.'})
        }

        const user = await User.findById(req.user.id);
        if(!user){
            return res.status(400).json({msg: 'User not authorised.'});
        }

        let author = await Author.findById(req.params.id)

        let myFile = req.files.image.name.split(".")
        const fileType = myFile[myFile.length - 1]
        
        const encodedName = `${uuid()}.${fileType}`

        const params = {
            Bucket: "onloud-storage/author/image",
            Key: encodedName,
            Body: req.files.image.data
        }

        const newImage = {
            user: req.user.id,
            image: encodedName
        }
        await author.images.unshift(newImage);
        
        s3.upload(params, (error, data) => {
            if(error){
                return res.status(400).send('File is not valid.')
            }
            
        });

        //file.mv(`./client/uploads/authors/image/${file.name}`, err => {
        //    if(err){
        //        console.error(err);
        //        return res.status(500).send(err);
        //    }
        //});


        await author.save();
        
        res.json(author.images)

    }
    catch(err){
        console.error(err.message);
        return res.status(500).send('Server error.');
    }
});

router.post('/edit/:id', [auth, [
    check('author', 'Name of author is required.')
    .not()
    .isEmpty()
]], async(req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const {author, nationality, age, genres, instruments, bio} = req.body;

    let authorFields = {};
    
    if(nationality) authorFields.nationality = req.body.nationality;
    if(age) authorFields.age = req.body.age;
    if(genres) authorFields.genres = req.body.genres;
    if(instruments) authorFields.instruments = req.body.instruments;
    if(bio) authorFields.bio = req.body.bio;
    

    try{
        
        let currentAuthor = await Author.findById(req.params.id);
        
        if(!currentAuthor){
            return res.status(400).json({msg: 'Author not found.'})
        }

        const authors = await Author.find().sort({date: -1});
        const exist = authors.filter(auth => auth.author.toLowerCase() == author.toLowerCase() && auth.author.toLowerCase() !== currentAuthor.author.toLowerCase())
        if(exist[0]){

            return res.status(400).json({msg: 'This author already exists.'})
        }

        const user = await User.findById(req.user.id).select('-password');
        
        if(!user){
            return res.status(400).json({msg: 'User not authorised.'});
        }

        const name = author.charAt(0).toUpperCase() + author.slice(1);

        if(author) authorFields.author = name;
        authorFields.avatar = user.avatar


        currentAuthor = await Author.findByIdAndUpdate({_id:req.params.id}, authorFields, {new:true})

        await currentAuthor.save()
        res.json(currentAuthor);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }

});

// route post   api/authors/albumImage/author_id/:id
// description  post album image
// access       private

router.post('/albumImage/:author_id/:id', auth, upload, async(req, res) => {
    try{
        
        if(req.files === null){
            return res.status(400).json({msg: 'No file uploaded.'});
        }

        const user = await User.findById(req.user.id);
        if(!user){
            return res.status(400).json({msg: 'User not authorised.'});
        }

        let author = await Author.findById(req.params.author_id)
        if(!author){
            return res.status(400).json({ msg: 'Author not found.'})
        }
        let album = author.albums.filter(album => album._id == req.params.id)
        
        let albumFile = req.files.image.name.split('.');
        const fileType = albumFile[albumFile.length - 1];

        const encodedName = `${uuid()}.${fileType}`

        const params = {
            Bucket: 'onloud-storage/author/album/image',
            Key: encodedName,
            Body: req.files.image.data
        }

        s3.upload(params, (error, data) => {
            if(error){
                return res.status(400).send('File is not valid.')
            }
        })

        const newImage = {
            user: req.user.id,
            image: encodedName
        }

        album[0].images.unshift(newImage)

        author.albums.map(a => a._id == req.params.id ? album : a)
        await author.save();

        res.json(author.albums.map(a => a._id == req.params.id ? album[0] : a))
        

    }
    catch(err){
        console.error(err.message);
        return res.status(500).send('Server error.');
    }
});

router.post('/albumEdit/:author_id/:id', [auth, [
    check('album', 'Name is required.')
    .not()
    .isEmpty(),
    check('year', 'Year is required.')
    .not()
    .isEmpty()
]], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    
    try{
        let author = await Author.findById(req.params.author_id);
        if(!author){
            return res.status(400).json({msg: 'Author is not found.'})
        }
        const user = await User.findById(req.user.id)
        if(!user){
            return res.status(400).json({msg: 'User not authorised.'})
        }

        let album = author.albums.filter(album => album._id == req.params.id)

        album[0].album = req.body.album,
        album[0].year = req.body.year,
        album[0].avatar = user.avatar
        
        await author.save()

        res.json(author.albums)
    }
    catch(err){
        console.error(err.message);
        return res.status(500).send('Server error.');
    }
});
router.post('/albumRemove/:author_id/:id', auth, async (req,res) => {
    
    try{
        const user = await User.findById(req.user.id)
        if(!user){
            return res.status(400).json({msg: 'User not authorised.'})
        }

        let author = await Author.findById(req.params.author_id);
        if(author.user.toString() !== req.user.id){
            return res.status(400).json({msg: 'User not authorised.'})
        }
        author.albums = author.albums.filter(album => album._id.toString() !== req.params.id)
        
        await author.save()
        res.json(author.albums)
    }
    catch(err){
        console.error(err.message);
        return res.status(500).send('Server error.');
    }
});

module.exports = router;