const multer = require('multer');
const crypto = require('crypto');
const path   = require('path');


/* Set Image Storage */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve('uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '-' + crypto.randomBytes(7).toString('hex') + path.extname(file.originalname));
    }
});

/* Initialize Uploader */
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1000000,			//A million bytes
    },
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = 'Only image files are allowed!';
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
}).single('myImage');

/* Upload Image */
function uploadProfilePic(req, res, next){
    
    upload(req, res, function(err){
        console.log('uploadProfilePic');
        if(! req.file) return next();
        console.log(req.file);
        if (req.fileValidationError) {
            return res.json({success: false, upload: false, error: req.fileValidationError});
        }
        else if (err instanceof multer.MulterError) {
            return res.json({success: false, upload: false, error: err});
        }
        else if (err) {
            return res.json({success: false, upload: false, error: err});
        }
        //save into db the req.file.path
        console.log(`Image ${req.file.path} uploaded`);
        next();
    })
}

module.exports = {uploadProfilePic};