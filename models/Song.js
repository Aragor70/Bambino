const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name:{
        type: String
    },
    avatar:{
        type: String
    },
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    text:{
        type: String,
        required: true
    },
    album:{
        type: String,
        default: "Single"
    },
    publicationYear:{
        type: Number,
        required: true
    },
    category: {
        type: String
    },
    language: {
        type: String,
        required: true
    },
    video:{
        type: String
    },
    images:[{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        image:{
            type: String
        },
        date:{
            type: Date,
            default: Date.now
        }
    }],
    views: [{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        song:{
            type: String
        },
        date:{
            type: Date,
            default: Date.now
        },
        author:{
            type: String
        }
    }],
    likes: [{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        date:{
            type: Date,
            default: Date.now
        },
        song:{
            type: String
        },
        author:{
            type: String
        }
    }],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        name: {
            type: String
        },
        avatar:{
            type: String
        },
        text: {
            type: String,
            isRequired: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = Song = mongoose.model('Song', SongSchema);