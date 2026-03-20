const multer = require("multer");
const path = require("path");

// Destination and filename setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/searchbar/");
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1E9) + ext;
        cb(null, uniqueName);
    }
});

// File filter (optional: only images)



const upload = multer({ storage });

module.exports = upload;
