const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');
const config = require('config');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const AWS = require('aws-sdk');
const {v4: uuid} = require('uuid');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Author = require('../../models/Author');
const Song = require('../../models/Song');
const upload = require('../../middleware/upload');

// connect with aws amazon storage
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
})


//route get    api/profile/me
//description  get user profile
//access       private
router.get('/me', auth, async(req, res) => {
    try{
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar'])
        if(!profile){
            return res.status(400).json({msg:'There is no profile for this user.'})
        }
        
        res.json(profile);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }
});

//route post   api/profile
//description  create or update user profile
//access       private

router.post('/', [auth, [
    check('bio', 'Info about you is required.')
    .not()
    .isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        age,
        gender,
        location, 
        passion, 
        bio, 
        status, 
        githubusername, 
        skills, 
        youtube, 
        facebook, 
        twitter, 
        instagram, 
        linkedin
    } = req.body;
    //build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if(age) profileFields.age = age;
    if(gender) profileFields.gender = gender;
    if(location) profileFields.location = location;
    if(passion) profileFields.passion = passion;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;

    if(skills){
        profileFields.skills = skills;
    }
    // Build social object
    profileFields.social = {};
    if(youtube) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(facebook) profileFields.social.facebook = facebook;
    if(linkedin) profileFields.social.linkedin = linkedin;
    if(instagram) profileFields.social.instagram = instagram;
    
    try{
        let profile = await Profile.findOne({ user: req.user.id });
        if(profile){
            // update profile
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, 
                { new: true });
            return res.json(profile);
        }
        // Create
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);


    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }
    
})

//route get    api/profile
//description  get all profiles
//access       public

router.get('/', async (req, res) => {
    try{
        let profiles = await Profile.find().populate('user', ['name', 'avatar']);
          
        res.json(profiles);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }
});

//route get    api/profile/user/:user_id
//description  get profile by user id
//access       public

router.get('/user/:user_id', async (req, res) => {
    try{
        profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
        if(!profile){
            return res.status(400).json({ msg: 'There is no profile for this user.' });
        }
        res.json(profile);
    }
    catch(err){
        console.error(err.message);
        if(err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'There is no profile for this user.' });
        }
        
        res.status(500).send('Server error.');
    }

});

//route DELETE api/profile
//description  delete profil, user, posts
//access       private

router.delete('/', auth, async (req, res) => {
    try{
        const user = await User.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

        if(user) {
            // Remove posts

            // Removing profile
            await Profile.findOneAndRemove({ user: req.user.id });

            // remove user
            await User.findOneAndRemove({ _id: req.user.id });

            res.json({ msg: `${req.user.id} user deleted.` });
        }
        else{
            res.json({ msg: 'This user does not exist.' });
        }
        
        
    }
    catch(err){
        console.error(err.message);
        res.status(500).send( 'Server error.' );
    }
});

//route PUT    api/profile/quote
//description  put quote into the profile
//access       private

router.put('/quote', [auth, [
    check('title', 'Title is required.')
    .not()
    .isEmpty(),
    check('content', 'Content is required.')
    .not()
    .isEmpty(),
    check('location', 'Location is required.')
    .not()
    .isEmpty(),
    check('author', 'Author is required.')
    .not()
    .isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        title, content, location, author, date
    } = req.body;
    const newQuote = {
        title, content, location, author, date
    }

    try{
        const profile = await Profile.findOne({ user: req.user.id });
        profile.quote.unshift(newQuote);
        await profile.save();

        res.json(profile);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }

});

//route DELETE api/profile/quote/:quote_id
//description  delete quote from the profile
//access       private

router.delete('/quote/:quote_id', auth, async(req, res) => {
    try{
        profile = await Profile.findOne({ user: req.user.id });

        // get remove index
        const removeIndex = profile.quote.map(item => item.id).indexOf(req.params.quote_id);
        profile.quote.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }
});

//route PUT    api/profile/recommendation
//description  put recommendation into the profile
//access       private

router.put('/recommendation', [auth, [
    check('title', 'Title is required.')
    .not()
    .isEmpty(),
    check('author', 'Author is required.')
    .not()
    .isEmpty(),
    check('description', 'Description is required.')
    .not()
    .isEmpty(),
    check('location', 'Location is required.')
    .not()
    .isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty){
        res.status(400).json({ errors: errors.array() });
    }
    
    const {
        title, author, description, location, date
    } = req.body;

    const newRecom = {
        title, author, description, location, date
    }
    try{
        const profile = await Profile.findOne({ user: req.user.id });
        profile.recommendation.unshift(newRecom);
        await profile.save();

        res.json(profile);
    }
    catch(err){
        res.status(500).send('Server error.');
    }


});

//route DELETE api/profile/recommendation/:recom_id
//description  delete recommendation from the profile
//access       private

router.delete('/recommendation/:recom_id', auth, async(req, res) => {
    try{ 
            
        const profile = await Profile.findOne({ user: req.user.id });
        
        if(profile){
        
            const removeIndex = profile.recommendation.map(item => item.id).indexOf(req.params.recom_id);
            profile.recommendation.splice(removeIndex, 1);
            await profile.save();
    
            res.json(profile);
        }
        else{
            res.json({msg: 'This user does not exist.' });
        }
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }

});

//route get    api/profile/github/:username
//description  get repos from github
//access       public

router.get('/github/:username', async(req,res) => {
    try{
        const uri = encodeURI(
            `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
            );
        
        const headers = {
            'user-agent': 'node.js',
            Authorization: `token ${config.get('githubToken')}`
            }
        const githubResponse = await axios.get(uri, { headers });
        
        return res.json(githubResponse.data);
        
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }
});

//route PUT    api/profile/subscribe
//description  put subscribe into the profile
//access       private
router.put('/subscribe/:id', auth, async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({ errors: errors.array() });
    }    
    try{
        const user = await User.findById(req.user.id).select('-password');
        let profile = await Profile.findOne({user: req.user.id});
        if(!profile){
            return res.status(400).json({msg: 'Profile not found.'});
        }
        const author = await Author.findById(req.params.id);
        const exist = profile.subscribes.filter(sub=> sub.author == req.params.id);
        if(exist[0]){
            return res.status(400).json({msg: 'This subscribe already exists.'});
        }
        const newSubscribe = {
            profile: profile._id,
            name: user.name,
            avatar: user.avatar,
            author: req.params.id
        }
        profile.subscribes.unshift(newSubscribe);
        await profile.save();
        return res.json(profile.subscribes);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }
});


// route post   footer
// description  add global profile footer
// access       private

router.post('/footer', [auth, [
    check('text', 'Text is required.')
    .not()
    .isEmpty()
 ]], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
        const {text} = req.body;
        let profileFields = {};
        if(text) profileFields.text = text;
    
    try{
        const user = await User.findById(req.user.id).select('-password');
        
        profileFields.name = user.name;
        profileFields.avatar = user.avatar;

        let profile = await Profile.findOne({ user: req.user.id });
        let exist = profile.footer
        if(exist.length>0){
            profile.footer[0].remove();
            profile.footer.unshift(profileFields);
            await profile.save()
            return res.json(profile.footer)
        }
        //create new 
        profile.footer.unshift(profileFields);
        await profile.save();
        res.json(profile.footer);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }
});
// upload test
router.post('/upload', auth, async(req, res) => {
    
    if(req.files === null){
        return res.status(400).json({msg: 'No file uploaded.'})
    }

    const user = await User.findById(req.user.id).select('-password');
    if(!user){
        return res.status(400).json({msg: 'User not authorised.'})
    }
    let profile = await Profile.findOne({user:req.user.id});


    const newFile = {
        user: req.user.id,
        name: user.name,
        avatar: user.avatar,
        filePath: `/uploads/${file.name}`,
        fileName: file.name
    }
    profile.myfile.unshift(newFile);

    await profile.save();

    file.mv(`${__dirname}/uploads/${file.name}`, err => {
        if(err){
            console.error(err);
            return res.status(500).send(err);
        }
        res.json({ fileName: file.name, filePath: `/uploads/${file.name}`});

    });

});

router.post('/avatar', auth, upload, async(req, res) => {
    
    try{

        let user = await User.findById(req.user.id);
        if(!user){
            return res.status(400).json({msg: 'User not authorised.'})
        }

        if(req.files === null){
            return res.status(400).json({msg: 'No file uploaded.'})
        }
        
        let avatarFile = req.files.file.name.split('.');
        const fileType = avatarFile[avatarFile.length - 1];

        const encodedName = `${uuid()}.${fileType}`;

        const params = {
            Bucket: 'onloud-storage/profile/avatar',
            Key: encodedName,
            Body: req.files.file.data
        }
        

        let userFields = {};
        userFields.avatar = encodedName;

        user = await User.findByIdAndUpdate({_id:req.user.id}, userFields, {new: true});

        s3.upload(params, (error, data) => {
            if(error){
                return res.status(400).send('File is not valid.')
            }
        })

        //file.mv(`./client/uploads/avatar/${file.name}`, err => {
        //    if(err){
        //        console.error(err);
        //        return res.status(500).send(err);
        //    }
        //});

        await user.save()
        res.json(user);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }
});

router.get('/song_history', auth, async(req, res) => {
    try{
        const songs = await Song.find();
        let search = songs.map(song => song.views).flat(1);
        
        function compareFunction(a, b){
            
            const vA = a.date
            const vB = b.date
            
            let comparision = 0;
            if(vA > vB){
                comparision = -1
            }
            else if(vA < vB){
                comparision = 1
            }
            return comparision
        }
        const sortedViews = search.sort(compareFunction)
        let timeNow = new Date(Date.now() - 10);
        const views = sortedViews.filter(view => view.user.toString() === req.user.id)
        
        
        
        res.json(views)
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }
})


router.post('/pictures', auth, upload, async(req, res) => {
    try{

        if(req.files === null){
            return res.status(400).json({msg: 'The file was not selected.'});
        }
        const profile = await Profile.findOne({user: req.user.id});
        if(!profile){
            return res.status(400).json({msg: 'Profile not found.'})
        }
        const user = await User.findById(req.user.id).select('-password');
        if(!user){
            return res.status(400).json({msg: 'User not authorised.'})
        }
        
        let pictureFile = req.files.file.name.split('.');
        const fileType = pictureFile[pictureFile.length - 1];

        const encodedName = `${uuid()}.${fileType}`;

        const params = {
            Bucket: 'onloud-storage/profile/picture',
            Key: encodedName,
            Body: req.files.file.data
        }
        

        s3.upload(params, (error, data) => {
            if(error){
                return res.status(400).send('File is not valid.')
            }
        })

        profile.pictures.unshift({
            user: req.user.id,
            name: user.name,
            avatar: user.avatar,
            fileName: encodedName
        });


        /* file.mv(`./client/uploads/picture/${file.name}`, err => {
            if(err){
                console.error(err);
                return res.status(500).send(err);
            }
        }); */
        
        await profile.save();
        res.json(profile.pictures);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error.');
    }
})

module.exports = router;