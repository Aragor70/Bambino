const crypto = require('crypto');
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    twoFactor: {
        type: Boolean,
        default: false
    },
    twoFactorKey: [{
        type: Number
    }],
    date: {
        type: Date,
        default: Date.now
    }
    
});

UserSchema.methods.getResetPasswordToken = function() {
    // generate token
    let resetToken = crypto.randomBytes(20).toString('hex');
    console.log(crypto.randomBytes(20))
    // hash token and put it to resetPasswordToken in the model
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // set expire
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    return resetToken;
}

module.exports = User = mongoose.model('user', UserSchema);