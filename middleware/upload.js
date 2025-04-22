const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+"-"+file.originalname);
    }
})

const upload = multer ({storage});

module.exports=upload

// storage defines where the files will be saved (./upload) and assigns them unique filenames.
// upload.single("file") ensures a single file is uploaded under the file field.