require('dotenv').config({ path: '../config/config.env' })
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
let sendEmail = async options => {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_EMAIL, 
        pass: process.env.SMTP_PASSWORD
    }
  });

  // send mail with defined transport object
  let message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`, 
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.message // plain text body
  };
  
  const info = await transporter.sendMail(message)

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}
module.exports = sendEmail;