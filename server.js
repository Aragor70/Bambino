require('dotenv').config({ path: './config/config.env' })

const express = require('express');
const connect = require('./config/db');
const fileUpload = require('express-fileupload');

const path = require('path')

const app = express();

// serve sattic assets if in production
if(process.env.NODE_ENV === "production") {
    // set static folder
    app.use(express.static('client/build'))

    // connect Mongo database
    connect();

    

    // init middleware
    app.use(express.json({ extended: false }))

    app.use(fileUpload());
    
    app.get('/', (req, res) => res.send('Server is Running...'))

    app.use('/api/users', require('./routes/api/users'));
    app.use('/api/auth', require('./routes/api/auth'));
    app.use('/api/profile', require('./routes/api/profile'));
    app.use('/api/posts', require('./routes/api/posts'));
    app.use('/api/songs', require('./routes/api/songs'));
    app.use('/api/authors', require('./routes/api/authors'));
    app.use('/api/newsletters', require('./routes/api/newsletters'));
    app.use('/api/quotes', require('./routes/api/quotes'));

    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
    
}



/*
app.post('/upload', (req, res)=>{
    if(req.files === null){
        return res.status(400).json({msg: 'No file uploaded.'})
    }
    const file= req.files.file;

    file.mv(`${__dirname}/react-od-podstaw/public/uploads/${file.name}`, err => {
        if(err){
            console.error(err);
            return res.status(500).send(err);
        }
        res.json({ fileName: file.name, filePath: `/uploads/${file.name}`});

    });

}); */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}.`));


