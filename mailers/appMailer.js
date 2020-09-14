const mailer = require('./mailer');

exports.applicationNotify = (options) => {
    const defaultOpitions = {
        subject: 'bambino',
        view: 'application-notification'
    }
    console.log(options)
    return mailer.send(Object.assign(defaultOpitions, options))
}