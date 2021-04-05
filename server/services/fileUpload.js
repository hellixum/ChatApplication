const multer = require('multer'); 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); 
    }, 
    filename: (req, file, cb) => {
        console.log(file); 
        cb(null, file.originalname); 
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
        cb(null, true); 
    }else{
        cb(null, false); 
    }
}

exports.upload = multer({ storage: storage, fileFilter: fileFilter });