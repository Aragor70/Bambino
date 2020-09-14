
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('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')

const message = {};
message.from = 'mikey.prus@gmail.com'

/* message.mail_settings = {
    sandbox_mode:{
        enable: true
    }
}; */
exports.message = message;