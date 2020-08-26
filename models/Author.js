const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
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
    author:{
        type: String,
        isRequired: true
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
            ref: 'users'
        },
        image:{
            type: String
        }
    }],
        albums:[{
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
                        ref: 'users'
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