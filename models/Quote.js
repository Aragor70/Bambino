const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
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
    content:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    likes:[{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        quote:{
            type: String
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
})
module.exports = Quote = mongoose.model('Quote', QuoteSchema)