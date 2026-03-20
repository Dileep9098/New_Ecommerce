const express=require("express")
const { parentCategory, childCategory, getAllParentCategory, deleteParentCategory, updateParentCategory, getAllChildCategory, deleteChildCategory, updateChildCategory } = require("../Controller/parentCategoryController")
const router=express.Router()
const multer=require("multer")
const path = require('path'); 

const sharp = require("sharp"); // ✅ Sharp Import Karo
const fs = require("fs");

const { isAuthenticateUser, authorizeRoles } = require("../Middlewares/auth");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/category'));
        // cb(null, path.join(__dirname, '../../frontend/public/image/category'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

// compress Images 

const compressImages = async (req, res, next) => {
    if (!req.files || req.files.length === 0) return next();

    try {
        const compressedImages = await Promise.all(
            req.files.map(async (file) => {
                const outputPath = path.join(__dirname, "../uploads/compressed_" + file.filename);
                
                await sharp(file.path)
                    .resize(800) 
                    .jpeg({ quality: 70 }) 
                    .toFile(outputPath);

                    fs.unlinkSync(file.path);

                return {
                    ...file,
                    path: outputPath,
                    filename: file.filename,
                };
            })
        );

        req.files = compressedImages; // ✅ Replace Original Files with Compressed Ones
        next();
    } catch (error) {
        console.error("Image Compression Error:", error);
        return res.status(500).json({ error: "Image compression failed" });
    }
};

router.route("/admin/add-parent-category").post(isAuthenticateUser,authorizeRoles("admin"),upload.single("file"),parentCategory)
router.route("/admin/get-parent-category").get(getAllParentCategory)
router.route("/admin/delete-parent-category/:id").delete(isAuthenticateUser,authorizeRoles("admin"),deleteParentCategory)
router.route("/admin/update-parent-category/:id").put(isAuthenticateUser,authorizeRoles("admin"),upload.single("file"),updateParentCategory)


//----!! Child Category

router.route("/admin/add-child-category").post(isAuthenticateUser,authorizeRoles("admin"),upload.single("file"),childCategory)
router.route("/admin/get-child-category").get(getAllChildCategory)
router.route("/admin/delete-child-category/:id").delete(isAuthenticateUser,authorizeRoles("admin"),deleteChildCategory)
router.route("/admin/update-child-category/:id").put(isAuthenticateUser,authorizeRoles("admin"),upload.single("file"),updateChildCategory)



module.exports=router