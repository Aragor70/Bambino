const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name:{
        type: String
    },
    avatar:{
        type: String
    },
    author:{
        type: String,
        required: true
    },
    bio:{
        type: String
    },
    nationality:{
        type: String
    },
    age:{
        type: String
    },
    genres:{
        type: String
    },
    instruments:{
        type: String
    },
    images:[{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        image:{
            type: String
        }
    }],
        albums:[{
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'user'
                },
                name: {
                    type: String
                },
                avatar:{
                    type: String
                },
                album: {
                    type: String,
                    required: true
                },
                year: {
                    type: String,
                    required: true
                },
                images:[{
                    user:{
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'user'
                    },
                    image:{
                        type: String
                    }
                }],
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
module.exports = Author = mongoose.model('Author', AuthorSchema)