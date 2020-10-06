const mongoose = require('mongoose');

const NewsletterSchema = new mongoose.Schema({
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
    email:{
        type: [String],
        required: true,
        unique: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});
module.exports = Newsletter = mongoose.model('Newsletter', NewsletterSchema);