const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
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
    text:{
        type: String,
        required: true
    },
    image:{
        type: String
    },
    views: [{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        post:{
            type: String
        },
        date:{
            type: Date,
            default: Date.now
        }
    }],
    likes:[{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    }],
    comments:[{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        name:{
            type: String
        },
        avatar:{
            type: String
        },
        text:{
            type: String,
            required: true
        },
        date:{
            type: Date,
            default: Date.now
        }

    }],
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Post = mongoose.model('post', PostSchema)