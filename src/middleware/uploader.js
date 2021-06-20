
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination : path.join(__dirname + '../../../img'),    
  filename: function(req, file, cb){
    cb(null, "foto1");
  }
});
 
const uploadFileLocal = multer({ storage: storage }).single('foto')

module.exports = {uploadFileLocal}