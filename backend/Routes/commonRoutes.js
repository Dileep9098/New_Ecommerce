const express = require("express")

const router = express.Router()
const multer = require("multer")
const path = require('path');
const fs = require("fs");

const sharp = require("sharp"); // ✅ Sharp Import Karo

const { isAuthenticateUser, authorizeRoles } = require("../Middlewares/auth");
const { createHomeBanner, getAllHomeBanner, deleteHomeBanner, updateHomebanner, updateBannerStyle } = require("../Controller/homeBannerController");
const { singleUpload, singleUploadLogo, singleUploadBlog, singleUploadHotDealBanner } = require("../Middlewares/multer");
const { createCompaingns, getAllCompaingns, deleteCompaingns, updateCompaingns } = require("../Controller/compaingnsController");
const { createSiteLogo, getAllSiteLogo, deleteSiteLogo, updateSiteLogo } = require("../Controller/siteLogoController");
const { createBlog, getAllBlogs, deleteBlog, updateBlog } = require("../Controller/blogController");
const { createHotDealBanner, deleteHotDealBanner, updateHotDealBanner, getAllHotDealBanner } = require("../Controller/hotDealBannerController");
const { addProdcutSize, getAllProdcutSizes, deleteProdcutSizes, updateProdcutSizes } = require("../Controller/ProdcutSize");
const { updateProductData } = require("../Controller/productController");
const { addProductReview } = require("../Controller/productReviewController");


const { addTaxDetails, getAllTaxDetails, deleteTaxDetail, updateTaxDetail } = require("../Controller/TaxController");


const uploadPath = path.join(__dirname, "../uploads/banner");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
});

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

        req.files = compressedImages; 
        next();
    } catch (error) {
        console.error("Image Compression Error:", error);
        return res.status(500).json({ error: "Image compression failed" });
    }
};

// Home Banner Routes

router.post(
  "/admin/add-home-banner",
  upload.single("file"),
  createHomeBanner
);
router.put(
  "/admin/update-home-banner/:id",
  upload.single("file"),
  updateHomebanner
);
// router.post("/admin/update-home-banner/:id",upload.single("file"),updateHomebanner)
router.route("/admin/get-home-banner").get( getAllHomeBanner)
router.route("/admin/delete-home-banner/:id").delete(isAuthenticateUser, authorizeRoles("admin"), deleteHomeBanner)
router.route("/admin-select-slider-style").put(updateBannerStyle)


// Compaingns Routes

router.route("/admin/add-compaingns").post(isAuthenticateUser, authorizeRoles("admin"),upload.single("file"), createCompaingns)
router.route("/admin/get-compaingns").get( getAllCompaingns)
router.route("/admin/delete-compaingns/:id").delete(isAuthenticateUser, authorizeRoles("admin"), deleteCompaingns)
router.route("/admin/update-compaingns/:id").put(isAuthenticateUser, authorizeRoles("admin"), updateCompaingns)
// router.route("/admin/update-IsActive-compaingns/:id").put(isAuthenticateUser,authorizeRoles("admin"),updateIsActiveCompaingns)


// Site Logo Routes

router.route("/admin/add-siteLogo").post(isAuthenticateUser, authorizeRoles("admin"), createSiteLogo)
router.route("/admin/get-siteLogo").get( getAllSiteLogo)
router.route("/admin/delete-siteLogo/:id").delete(isAuthenticateUser, authorizeRoles("admin"), deleteSiteLogo)
router.route("/admin/update-siteLogo/:id").put(isAuthenticateUser, authorizeRoles("admin"), updateSiteLogo)

// Blog Routes

router.route("/admin/add-blog").post(isAuthenticateUser, authorizeRoles("admin"), upload.single("file"), createBlog)
router.route("/admin/get-blog").get( getAllBlogs)
router.route("/admin/delete-blog/:id").delete(isAuthenticateUser, authorizeRoles("admin"), deleteBlog)
router.route("/admin/update-blog/:id").put(isAuthenticateUser, authorizeRoles("admin"), updateBlog)


// Hot Deal Banner Routes

router.route("/admin/add-hot-deal-banner").post(isAuthenticateUser, authorizeRoles("admin"), upload.single("file"),createHotDealBanner)
router.route("/admin/get-hot-deal-banner").get( getAllHotDealBanner)
router.route("/admin/delete-hot-deal-banner/:id").delete(isAuthenticateUser, authorizeRoles("admin"), deleteHotDealBanner)
router.route("/admin/update-hot-deal-banner/:id").put(isAuthenticateUser, authorizeRoles("admin"),upload.single("file"), updateHotDealBanner)


router.route("/admin/add-productSize").post(isAuthenticateUser,authorizeRoles("admin"),addProdcutSize)
router.route("/admin/get-all-productSize").get(getAllProdcutSizes)
router.route("/admin/delete-productSize/:id").delete(isAuthenticateUser,authorizeRoles("admin"),deleteProdcutSizes)
router.route("/admin/update-productSize/:id").put(isAuthenticateUser,authorizeRoles("admin"),updateProdcutSizes)

router.route("/add-productReview").post(addProductReview)
// router.route("/admin/get-all-productSize").get(getAllProdcutSizes)
// router.route("/admin/delete-productSize/:id").delete(isAuthenticateUser,authorizeRoles("admin"),deleteProdcutSizes)
// router.route("/admin/update-productSize/:id").put(isAuthenticateUser,authorizeRoles("admin"),updateProdcutSizes)


// Tax Details 


router.route("/admin/add-tax-details").post(isAuthenticateUser,authorizeRoles("admin"),addTaxDetails)
router.route("/admin/get-all-tax-details").get(getAllTaxDetails)
router.route("/admin/delete-tax-details/:id").delete(isAuthenticateUser,authorizeRoles("admin"),deleteTaxDetail)
router.route("/admin/update-tax-details/:id").put(isAuthenticateUser,authorizeRoles("admin"),updateTaxDetail)


module.exports = router