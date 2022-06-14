const multer = require("multer");
const { storage } = require("../db/config");

const upload = multer({
  storage
});



module.exports = () => {
    return upload.single('file')
};