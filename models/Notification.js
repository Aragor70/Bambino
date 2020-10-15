const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    turnOn: {
        type: Boolean,
        default: true
    },
    service: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        from: {
            type: String,
            required: true
        },
        text: {
            type: String
        },
        turnOn: {
            type: Boolean,
            default: true
        },
        seen: {
            type: Boolean,
            default: false
        },
        opened: {
            type: Boolean,
            default: false
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    messager: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        name: {
            type: String,
            require: true
        },
        text: {
            type: String
        },
        turnOn: {
            type: Boolean,
            default: true
        },
        seen: {
            type: Boolean,
            default: false
        },
        opened: {
            type: Boolean,
            default: false
        },
        date: {
            type: Date,
            default: Date.now
        },
        message:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'message'
        }
    }],
    date:{
        type: Date,
        default: Date.now
    }
});
module.exports = Notification = mongoose.model('notification', NotificationSchema)