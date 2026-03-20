const multer = require("multer");
const path = require('path'); // Import path to handle file paths


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/'));
        // cb(null, path.join(__dirname, '../../frontend/public/image/compaingns/'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

exports.singleUpload = multer({ storage }).single("file");

// Multer storage configuration for siteLogo
const siteLogoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

exports.singleUploadLogo = multer({ storage: siteLogoStorage }).single("file");

const blogStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
exports.singleUploadBlog = multer({ storage: blogStorage }).single("file");

const hotDealStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

exports.singleUploadHotDealBanner = multer({ storage: hotDealStorage }).single("file");


const bulkExcelStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/BulkExcelUpload/'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

exports.singleUploadBulkExcel = multer({ storage: bulkExcelStorage }).single("file");

