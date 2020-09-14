
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENGRID_KEY)

const message = {};
message.from = 'mikey.prus@gmail.com'

/* message.mail_settings = {
    sandbox_mode:{
        enable: true
    }
}; */
exports.message = message;