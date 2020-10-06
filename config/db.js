const mongoose = require('mongoose');
const config = require('config');


const db = process.env.mongoPublicURI;


const connect = async () => {
    try{
        const conn = await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log(`Ciao, MongoDB connected... `);
        console.log(conn.connection.host)
    }
    catch(err){
        console.error(err.message);
        process.exit(1);
    }
}
module.exports = connect;