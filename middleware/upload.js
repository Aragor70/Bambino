const multer = require('multer');


module.exports = function(req, res, next) {
    
    // header = image

    try {
        const storage = multer.memoryStorage({
            disposition: function(req, file, callback){
                callback(null, '')
            }
        });
        const upload = multer({storage}).single('image')
        
        next()
    }
    catch(err){
        res.status(401).json({msg: 'File image is not valid.'});
    }
}