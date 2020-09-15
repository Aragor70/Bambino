const express = require('express');
const router = express.Router();

const sgMail = require('@sendgrid/mail');

router.post('/feedback', (req, res) => {

    try {
        
        const feedback = {
            rate: req.body.exp,
            messageField: req.body.message,
            name: req.body.name,
            email: req.body.email
        }
        const {rate, messageField, name, email} = feedback;

        const message = `
            Hi, we got a feedback message. \n \n
            Name: ${name},  \n
            E-mail: ${email},  \n
            Rate: ${rate} (bad, average, good),  \n \n
            Message: ${messageField}  \n \n

        `; 


        sgMail.setApiKey(process.env.SENGRID_KEY);
        const msg = {
            to: 'mikey.prus@gmail.com',
            from: 'mikey.prus@gmail.com',
            subject: 'onLoud Feedback',
            text: message
        }
        sgMail.send(msg)
        res.json('Email sent')

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error.');
    }
})


module.exports = router;