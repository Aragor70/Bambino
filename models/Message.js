const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    text:{
        type: String,
        required: true
    },
    opened: {
        type: Boolean,
        default: false
    },
    seen: {
        type: Boolean,
        default: false
    },
    date:{
        type: Date,
        default: Date.now
    }
});
module.exports = Message = mongoose.model('message', MessageSchema)