const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null,'public/images');
  },
  filename: (req, file, callback) => {
    const extension = MIME_TYPES[file.mimetype];
    callback(null,  uuidv4()+ '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('avatar');