const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    callback(null, `/images`);
  },
  filename: (req, file, cb) => {
    console.log(req.body.file);
    callback(null, req.body.file);
  },
});
let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");
let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;