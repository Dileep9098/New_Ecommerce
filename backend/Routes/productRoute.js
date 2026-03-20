// const express=require("express")
// const multer=require("multer")
// const path = require('path'); 
// const sharp = require("sharp"); // ✅ Sharp Import Karo
// const fs = require("fs");

// const router=express.Router()
// const { isAuthenticateUser, authorizeRoles } = require("../Middlewares/auth");
// const { addProduct, getAllProducts, deleteProduct, getSingleProduct, updateProductData, getAllProductsFeatured, bulkExcelUpload } = require("../Controller/productController");
// const { singleUploadBulkExcel } = require("../Middlewares/multer");



// // const storage = multer.diskStorage({
// //     destination: (req, file, cb) => {
// //         cb(null, path.join(__dirname, '../uploads/'));
// //     },
// //     filename: (req, file, cb) => {
// //         cb(null, Date.now() + path.extname(file.originalname));
// //     },
// // });




// // // const storage = multer.diskStorage({
// // //     destination: (req, file, cb) => {
// // //         cb(null, path.join(__dirname, '../uploads/'));
// // //     },
// // //     filename: (req, file, cb) => {
// // //         // Use the original name of the file
// // //         cb(null, file.originalname); 
// // //     },
// // // });

// // // // compress Images 


// // const compressImages = async (req, res, next) => {
// //     if (!req.files || req.files.length === 0) return next();

// //     try {
// //         const compressedImages = await Promise.all(
// //             req.files.map(async (file) => {
// //                 const outputPath = path.join(__dirname, "../uploads/compressed_" + file.filename);
                
// //                 await sharp(file.path)
// //                     .resize(800) 
// //                     .jpeg({ quality: 70 }) 
// //                     .toFile(outputPath);

// //                     fs.unlinkSync(file.path);

// //                 return {
// //                     ...file,
// //                     path: outputPath,
// //                     filename: file.filename,
// //                 };
// //             })
// //         );

// //         req.files = compressedImages; // ✅ Replace Original Files with Compressed Ones
// //         next();
// //     } catch (error) {
// //         console.error("Image Compression Error:", error);
// //         return res.status(500).json({ error: "Image compression failed" });
// //     }
// // };
// // const upload = multer({ storage });




// // const storage = multer.diskStorage({
// //     destination: (req, file, cb) => {
// //         cb(null, path.join(__dirname, '../uploads/'));
// //     },
// //     filename: (req, file, cb) => {
// //         // Use the original name of the file
// //         cb(null, file.originalname); 
// //     },
// // });

// // // 2. Compress Images Middleware
// // const compressImages = async (req, res, next) => {
// //     if (!req.files || req.files.length === 0) return next(); // No files to compress

// //     try {
// //         const compressedImages = await Promise.all(
// //             req.files.map(async (file) => {
// //                 console.log(`Processing file: ${file.originalname}`); // Log the filename for debugging
                
// //                 // Create a new output path for the compressed image
// //                 const outputPath = path.join(__dirname, "../uploads/Parijathandicraft_" + file.originalname); // Adding 'compressed_' prefix
                
// //                 console.log(`Output path: ${outputPath}`);  // Log the output path

// //                 // Compress the image using sharp
// //                 await sharp(file.path)
// //                     .resize(800)  // Resize to 800px width (height adjusts automatically)
// //                     .jpeg({ quality: 70 })  // Compress image quality to 70%
// //                     .toFile(outputPath);   // Save the compressed image with a new name

// //                 // Delete the original file after compression
// //                 fs.unlinkSync(file.path);

// //                 return {
// //                     ...file,
// //                     path: outputPath,   // Keep the compressed file path
// //                     filename: "compressed_" + file.originalname, // Prefix compressed filename
// //                 };
// //             })
// //         );

// //         req.files = compressedImages;  // Replace original files with compressed ones
// //         next(); // Proceed to the next middleware
// //     } catch (error) {
// //         console.error("Image Compression Error:", error);
// //         return res.status(500).json({ error: "Image compression failed" });
// //     }
// // };


// // Set up storage with multer
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, '../uploads/'));  // Specify upload destination
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));  // Use timestamp for filename
//     },
// });

// const upload = multer({ storage });

// // Image compression middleware
// const compressImages = async (req, res, next) => {
//     try {
//         // Assuming the file path is stored in req.file.path (set by multer)
//         const filePath = req.file.path;
//         const compressedFilePath = filePath.replace(path.extname(filePath), '-compressed' + path.extname(filePath));

//         // Use sharp to compress the image
//         await sharp(filePath)
//             .resize(800)  // Resize to width 800px, adjust as needed
//             .jpeg({ quality: 80 })  // Adjust JPEG quality to 80 (you can tweak this value)
//             .toFile(compressedFilePath);  // Save the compressed image to a new file

//         // Replace the original file path with the compressed one for later use
//         req.file.path = compressedFilePath;

//         next(); // Proceed to the next middleware or handler
//     } catch (error) {
//         console.error('Image compression error:', error);
//         res.status(500).send('Error during image compression');
//     }
// };

// // 3. Set up Multer for file uploads
// // const upload = multer({ storage });

// router.route("/admin/add-product-data").post(isAuthenticateUser,authorizeRoles("admin"),upload.array('ProductPictures', 8),compressImages,addProduct)
// router.route("/admin/get-all-product-data").get(getAllProducts)
// // router.route("/admin/get-all-product-data/:category_id/:category_name").get(getAllProducts);

// router.route("/admin/get-all-product-data-featured").get(getAllProductsFeatured)
// router.route("/admin/delete-product-data/:id").delete(isAuthenticateUser,authorizeRoles("admin"),deleteProduct)
// router.route("/admin/get-single-product/:id").get(getSingleProduct)
// router.route("/admin/update-product-data/:id").put(isAuthenticateUser,authorizeRoles("admin"),upload.array('ProductPictures', 8), compressImages ,updateProductData)



// router.route("/admin/bulk-upload-excel").post(singleUploadBulkExcel,bulkExcelUpload)


// module.exports=router




// const express=require("express")
// const multer=require("multer")
// const path = require('path'); 
// const sharp = require("sharp"); // ✅ Sharp Import Karo
// const fs = require("fs");

// const router=express.Router()
// const { isAuthenticateUser, authorizeRoles } = require("../Middlewares/auth");
// const { addProduct, getAllProducts, deleteProduct, getSingleProduct, updateProductData, getAllProductsFeatured, bulkExcelUpload } = require("../Controller/productController");
// const { singleUploadBulkExcel } = require("../Middlewares/multer");



// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, path.join(__dirname, '../uploads/'));
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));
//     },
// });




// // const storage = multer.diskStorage({
// //     destination: (req, file, cb) => {
// //         cb(null, path.join(__dirname, '../uploads/'));
// //     },
// //     filename: (req, file, cb) => {
// //         // Use the original name of the file
// //         cb(null, file.originalname); 
// //     },
// // });

// // // compress Images 


// const compressImages = async (req, res, next) => {
//     if (!req.files || req.files.length === 0) return next();

//     try {
//         const compressedImages = await Promise.all(
//             req.files.map(async (file) => {
//                 const outputPath = path.join(__dirname, "../uploads/compressed_" + file.filename);
                
//                 await sharp(file.path)
//                     .resize(800) 
//                     .jpeg({ quality: 70 }) 
//                     .toFile(outputPath);

//                     fs.unlinkSync(file.path);

//                 return {
//                     ...file,
//                     path: outputPath,
//                     filename: file.filename,
//                 };
//             })
//         );

//         req.files = compressedImages; // ✅ Replace Original Files with Compressed Ones
//         next();
//     } catch (error) {
//         console.error("Image Compression Error:", error);
//         return res.status(500).json({ error: "Image compression failed" });
//     }
// };
// // const upload = multer({ storage });




// // const storage = multer.diskStorage({
// //     destination: (req, file, cb) => {
// //         cb(null, path.join(__dirname, '../uploads/'));
// //     },
// //     filename: (req, file, cb) => {
// //         // Use the original name of the file
// //         cb(null, file.originalname); 
// //     },
// // });

// // // 2. Compress Images Middleware
// // const compressImages = async (req, res, next) => {
// //     if (!req.files || req.files.length === 0) return next(); // No files to compress

// //     try {
// //         const compressedImages = await Promise.all(
// //             req.files.map(async (file) => {
// //                 console.log(`Processing file: ${file.originalname}`); // Log the filename for debugging
                
// //                 // Create a new output path for the compressed image
// //                 const outputPath = path.join(__dirname, "../uploads/Parijathandicraft_" + file.originalname); // Adding 'compressed_' prefix
                
// //                 console.log(`Output path: ${outputPath}`);  // Log the output path

// //                 // Compress the image using sharp
// //                 await sharp(file.path)
// //                     .resize(800)  // Resize to 800px width (height adjusts automatically)
// //                     .jpeg({ quality: 70 })  // Compress image quality to 70%
// //                     .toFile(outputPath);   // Save the compressed image with a new name

// //                 // Delete the original file after compression
// //                 fs.unlinkSync(file.path);

// //                 return {
// //                     ...file,
// //                     path: outputPath,   // Keep the compressed file path
// //                     filename: "compressed_" + file.originalname, // Prefix compressed filename
// //                 };
// //             })
// //         );

// //         req.files = compressedImages;  // Replace original files with compressed ones
// //         next(); // Proceed to the next middleware
// //     } catch (error) {
// //         console.error("Image Compression Error:", error);
// //         return res.status(500).json({ error: "Image compression failed" });
// //     }
// // };



// // 3. Set up Multer for file uploads
// const upload = multer({ storage });

// router.route("/admin/add-product-data").post(isAuthenticateUser,authorizeRoles("admin"),upload.array('ProductPictures', 8),compressImages,addProduct)
// router.route("/admin/get-all-product-data").get(getAllProducts)
// // router.route("/admin/get-all-product-data/:category_id/:category_name").get(getAllProducts);

// router.route("/admin/get-all-product-data-featured").get(getAllProductsFeatured)
// router.route("/admin/delete-product-data/:id").delete(isAuthenticateUser,authorizeRoles("admin"),deleteProduct)
// router.route("/admin/get-single-product/:id").get(getSingleProduct)
// router.route("/admin/update-product-data/:id").put(isAuthenticateUser,authorizeRoles("admin"),upload.array('ProductPictures', 8), compressImages ,updateProductData)



// router.route("/admin/bulk-upload-excel").post(singleUploadBulkExcel,bulkExcelUpload)


// module.exports=router



const express=require("express")
const multer=require("multer")
const path = require('path'); 
const sharp = require("sharp"); // ✅ Sharp Import Karo
const fs = require("fs").promises; // fs ka promise-based version use karein

const router=express.Router()
const { isAuthenticateUser, authorizeRoles } = require("../Middlewares/auth");
const { addProduct, getAllProducts, deleteProduct, getSingleProduct, updateProductData, getAllProductsFeatured, bulkExcelUpload } = require("../Controller/productController");
const { singleUploadBulkExcel } = require("../Middlewares/multer");



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});


// // compress Images 



const compressImages = async (req, res, next) => {
    if (!req.files || req.files.length === 0) return next();

    console.log(`Starting compression for ${req.files.length} files...`);

    try {
        const compressedImages = [];

        for (const file of req.files) {
            try {
                console.log(`Compressing file: ${file.filename}`);
                const outputPath = path.join(__dirname, "../uploads/compressed_" + file.filename);

                await sharp(file.path)
                    .resize(800) // Resize to 800px width
                    .jpeg({ quality: 70 }) // Compress image quality to 70%
                    .toFile(outputPath);

                await fs.unlink(file.path); // Asynchronous delete for better performance

                console.log(`Compressed file saved to: ${outputPath}`);

                compressedImages.push({
                    ...file,
                    path: outputPath,
                    filename: "compressed_" + file.filename,
                });

            } catch (err) {
                console.error(`Error compressing file ${file.filename}:`, err);
            }
        }

        req.files = compressedImages; // Replace original files with compressed ones
        console.log("All files compressed successfully.");
        next();

    } catch (error) {
        console.error("Error during image compression:", error);
        return res.status(500).json({ error: "Image compression failed" });
    }
};


// 3. Set up Multer for file uploads
const upload = multer({ storage });

router.route("/admin/add-product-data").post(isAuthenticateUser, upload.array("ProductPictures", 10), authorizeRoles("admin"),addProduct)

router.route("/admin/get-all-product-data").get(getAllProducts)
// router.route("/admin/get-all-product-data/:category_id/:category_name").get(getAllProducts);

router.route("/admin/get-all-product-data-featured").get(getAllProductsFeatured)
router.route("/admin/delete-product-data/:id").delete(isAuthenticateUser,authorizeRoles("admin"),deleteProduct)
router.route("/admin/get-single-product/:id").get(getSingleProduct)
router.route("/admin/update-product-data/:id").put(isAuthenticateUser,authorizeRoles("admin"),upload.array("ProductPictures", 10), updateProductData)



router.route("/admin/bulk-upload-excel").post(singleUploadBulkExcel, bulkExcelUpload)


module.exports=router
