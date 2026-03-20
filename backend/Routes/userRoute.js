const express = require("express");
const path = require('path'); 

const sharp = require("sharp"); // ✅ Sharp Import Karo
const fs = require("fs");
const multer = require("multer");

const {
    registerUser,
    loginUser,
    logout,
    forgetPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateProfile,
    getAllUser,
    getSingleUser,
    updateUserRole,
    deleteUser,
    adminAddUser,
    sendContactDetails,
    getAllContact,
    deleteContact,
    sendSubscribersDetails,
    getAllSubscribers,
    deleteSubscribers,
    updateUserDetails,
    addAddress,
    getMyAddresses,
    setDefaultAddress,
    updateUserData,
    
} = require("../Controller/userController");
const { isAuthenticateUser, authorizeRoles } = require("../Middlewares/auth");


const router = express.Router();

// const { isAuthenticateUser, authorizeRoles } = require("../Middlewares/auth");
// const { singleUpload } = require("../middleware/multer");
// const { singleUserUpload } = require("../middleware/userImage");

// 👉👉👉 Working Well 
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       cb(null, '../frontend/public/image/');
//   },
//   filename: (req, file, cb) => {
//       cb(null, Date.now() + path.extname(file.originalname)); // Use extension for the filename
//   },
// });

// const upload = multer({ storage });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// compress Images 


const compressImages = async (req, res, next) => {
    // Check if there's no file uploaded or if a file is provided in req.body
    if (!req.file || req.body.file) return next();

    try {
        // Handle the single file compression
        const file = req.file; // req.file is a single file object here
        const outputPath = path.join(__dirname, "../uploads/compressed_" + file.filename);

        await sharp(file.path)
            .resize(800) // Resize the image
            .jpeg({ quality: 70 }) // Compress to 70% quality
            .toFile(outputPath);

        // Remove the original file after compression
        fs.unlinkSync(file.path);

        // Update the file path in the request
        req.file = {
            ...file,
            path: outputPath,
            filename: file.filename,
        };

        next();
    } catch (error) {
        console.error("Image Compression Error:", error);
        return res.status(500).json({ error: "Image compression failed" });
    }
};

const upload = multer({ storage });



router.route("/register").post(registerUser);

router.route("/login").post(loginUser)

router.route("/password/forgot").post(forgetPassword)

router.route("/password/reset/:token").put(resetPassword)

router.route("/me").get(isAuthenticateUser,getUserDetails)

router.route("/password/update/:id").put(updatePassword)

router.route("/me/update").put(isAuthenticateUser,updateProfile)
router.route("/update-user-data/:id").put(updateUserData)

router.route("/admin/user").get(isAuthenticateUser, authorizeRoles("admin"), getAllUser)
router.route("/admin/user/:id").get(isAuthenticateUser, authorizeRoles("admin"), getSingleUser).put(isAuthenticateUser, authorizeRoles("admin"), updateUserRole).delete(isAuthenticateUser, authorizeRoles("admin"), deleteUser)



// Only Admin

// router.route("/admin/update-user/:id").put(isAuthenticateUser, authorizeRoles("admin"), updateUserDetails)

router.route("/admin/update-user/:id").put(isAuthenticateUser, authorizeRoles("admin"), updateUserDetails);

// router.route("/admin/getHomeBannerData").get(isAuthenticateUser,authorizeRoles("admin"),getHomeBannerData)
// router.route("/admin/homeBannerData/:id").get(isAuthenticateUser, authorizeRoles("admin"), getSingleBanner).put(isAuthenticateUser, authorizeRoles("admin"), singleUpload,updateHomeBannerData).delete(isAuthenticateUser, authorizeRoles("admin"), deleteHomeBannerData)



router.route("/admin/add/user").post(isAuthenticateUser,authorizeRoles("admin"), adminAddUser)


// -------------------- Contact 

router.route("/send-contaction").post(sendContactDetails);
router.route("/admin/get-all-contaction").get(isAuthenticateUser,authorizeRoles("admin"), getAllContact)
router.route("/admin/delete-contact/:id").delete(isAuthenticateUser,authorizeRoles("admin"), deleteContact)

// -------------------- Contact 

router.route("/send-subscriber").post(sendSubscribersDetails);
router.route("/admin/get-all-subscriber").get(isAuthenticateUser,authorizeRoles("admin"), getAllSubscribers)
router.route("/admin/delete-subscriber/:id").delete(isAuthenticateUser,authorizeRoles("admin"), deleteSubscribers)


//---------------------- Address Routes -----------------------//
router.route("/add-address").post(isAuthenticateUser, addAddress);
router.route("/my-address").get(isAuthenticateUser, getMyAddresses);
router.route("/default-address").post( isAuthenticateUser,setDefaultAddress);


router.route("/logout").get(logout)

module.exports = router