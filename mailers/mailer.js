const sgMail = require('@sendgrid/mail');
const sgConfig = require('../config/sengrid');

const pug = require('pug');

exports.send = async (options) => {
    try{
        Object.assign(sgConfig.message, {
            to: options.email,
            subject: options.subject,
            html: render(options.view, options.data)
        })
    
        return await sgMail.send(sgConfig.message)

    } catch( err ) {
        console.log(err)
    }
    
}
function render(filename, data) {
    console.log(data)
    return pug.renderFile(`${__dirname}/../views/emails/${filename}.pug`, data)
}