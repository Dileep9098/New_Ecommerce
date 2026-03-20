// const path = require("path");
// const catchAsyncError = require("../Middlewares/catchAsyncError");
// const ErrorHandler = require("../utils/errorhandler");
// const fs = require('fs/promises');
// const HomeBanner = require('../Models/homeBannerModel');



// exports.createHomeBanner = catchAsyncError(async (req, res, next) => {
//     const data = req.body
//     const file = req.file ? path.basename(req.file.path) : req.file
//     console.log(data)
//     console.log(file)

//     const homeBanner = await HomeBanner.create({
//         file,
//         topTitle: data.topTitle,
//         mainTitle: data.mainTitle,
//         bottomTitle: data.bottomTitle,
//         leftButtonText: data.leftButtonText,
//         leftButtonUrl: data.leftButtonUrl,
//         rightButtonText: data.rightButtonText,
//         rightButtonUrl: data.rightButtonUrl,
//         DisplayNo: data.DisplayNo,
//         IsActive: data.IsActive,
//     })
//     if (!homeBanner) {
//         return next(ErrorHandler("HomeBanner does not Added", 400))
//     }

//     res.status(200).json({
//         success: true,
//         homeBanner,
//         message:"Home banner Data Added Successfully"
//     })
// })

// exports.getAllHomeBanner = catchAsyncError(async (req, res, next) => {

//     const allHomeBanners = await HomeBanner.find().sort({ createdAt: -1 })
//     if (!allHomeBanners) {
//         return next(ErrorHandler("Home Banner Not Found", 400))
//     }
//     res.status(200).json({
//         success: true,
//         allHomeBanners

//     })
// })


// exports.deleteHomeBanner = catchAsyncError(async (req, res, next) => {

//     const id = req.body
//     console.log(id)
//     const homeBanner = await HomeBanner.findById(req.params.id);
//     console.log(homeBanner)

//     // const checkSubcategory = await ChildCategory.find({
//     //     parentCategory: {
//     //         "$in": [req.params.id]
//     //     }
//     // }).countDocuments()

//     //   after make Product Model then change this 

//     // const checkProduct=await Product.find({
//     //     category:{
//     //         "$in":[_id]
//     //     }
//     // }).countDocuments()

//     // if (checkSubcategory > 0) {
//     //     return res.status(200).json({
//     //         success: false,
//     //         message: "Category is already use can't delete",
//     //         error: true
//     //     })
//     // }

//     if (!homeBanner) {
//         return next(new ErrorHandler(`User does not exite with Id : ${req.params.id}`))
//     }

//     if (homeBanner.file) {
//         const oldImagePath = ('../uploads/', homeBanner.file);
//         console.log('Old image path:', oldImagePath);

//         try {
//             await fs.unlink(path.join(__dirname, `../uploads/${oldImagePath}`)); // Delete the old image
//             console.log('Old image deleted successfully:', oldImagePath);
//         } catch (err) {
//             if (err.code === 'ENOENT') {
//                 console.log('Old image does not exist, skipping deletion:', oldImagePath);
//             } else {
//                 console.error('Error deleting old image:', err);
//                 return next(new ErrorHandler('Error deleting old image', 500));
//             }
//         }
//     }

//     await homeBanner.deleteOne();

//     res.status(200).json({
//         success: true,
//         message: "Home Banner deleted Successfully"
//     });

// })


// exports.updateHomebanner = catchAsyncError(async (req, res, next) => {

//     const data = req.body
//     console.log("data kya mila re", data)
//     // console.log("data kya mila re", data.name)
//     // console.log("data kya mila re", data.file)
//     // const file = req.file ? path.basename(req.file.path) : req.file

//     console.log('Uploaded file:', req.file);

//     const homebanner = await HomeBanner.findById(req.params.id);
//     console.log(homebanner)
//     if (!homebanner) {
//         return next(new ErrorHandler(`User does not exite with Id : ${req.params.id}`))
//     }
//     if (homebanner.file === data.file) {
//         const response = await HomeBanner.findByIdAndUpdate(req.params.id, data)
//         return res.status(200).json({
//             success: true,
//             response,
//             message: "Home Banner Updated Successfully !!"

//         })
//     }
//     else {
//         const oldImagePath = ('../uploads/', homebanner.file); // Proper path joining
//         console.log('Old image path:', oldImagePath);

//         try {
//             await fs.unlink(path.join(__dirname, `../uploads/${oldImagePath}`)); // Delete the old image
//             console.log('Old image deleted successfully:', oldImagePath);
//             const newUserData = {
//                 file: req.file ? path.basename(req.file.path) : homebanner.file,
//                 topTitle: data.topTitle,
//                 mainTitle: data.mainTitle,
//                 bottomTitle: data.bottomTitle,
//                 leftButtonText: data.leftButtonText,
//                 leftButtonUrl: data.leftButtonUrl,
//                 rightButtonText: data.rightButtonText,
//                 rightButtonUrl: data.rightButtonUrl,
//                 DisplayNo: data.DisplayNo,
//                 IsActive: data.IsActive,
//             };
//             console.log(newUserData)
//             const response = await HomeBanner.findByIdAndUpdate(req.params.id, newUserData, { new: true, runValidators: true, })
//             return res.status(200).json({
//                 success: true,
//                 response,
//                 message: "Home Banner Updated Successfully !!"
//             })
//         } catch (err) {
//             if (err.code === 'ENOENT') {
//                 console.log('Old image does not exist, skipping deletion:', oldImagePath);
//             } else {
//                 console.error('Error deleting old image:', err);
//                 return next(new ErrorHandler('Error deleting old image', 500));
//             }
//         }
//     }



//     // res.status(200).json({
//     //     success: true,
//     //     message: "User Updated Successfully"
//     // });

// })



const path = require("path");
const catchAsyncError = require("../Middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");
const HomeBanner = require('../Models/homeBannerModel');
const cloudinary = require("cloudinary");
const os = require("os");
const sharp = require("sharp");
const fs = require("fs");

// CREATE HomeBanner
// exports.createHomeBanner = catchAsyncError(async (req, res, next) => {
//   const data = req.body;
//   console.log("Kya Mila hai bhai mere ",req.body)

//   if (!req.file) {
//   return next(new ErrorHandler("Image is required", 400));
// }

// const file = req.file.filename;


//   // const originalName = path.parse(file.name).name;
//   // const sanitizedFileName = originalName.replace(/\s+/g, "_");

//   // const tempCompressedPath = path.join(
//   //   os.tmpdir(),
//   //   `compressed_${sanitizedFileName}.webp`
//   // );

//   // await sharp(file.tempFilePath).resize({ width: 1200 })
//   //   .webp({ quality: 60 })
//   //   .toFile(tempCompressedPath);

//   // const stats = fs.statSync(tempCompressedPath);
//   // const fileSizeInKB = Math.round(stats.size / 1024);
//   // console.log("✅ Compressed image size:", fileSizeInKB, "KB");

//   // const mycloud = await cloudinary.v2.uploader.upload(tempCompressedPath, {
//   //   folder: "HomeBanners",
//   //   public_id: sanitizedFileName,
//   //   use_filename: true,
//   //   unique_filename: false,
//   //   overwrite: true,
//   //   resource_type: "image",
//   // });

//   // fs.unlinkSync(tempCompressedPath);

//   const homeBanner = await HomeBanner.create({
//     // file: {
//     //   public_id: mycloud.public_id,
//     //   url: mycloud.secure_url,
//     // },
//     file: file,
//     topTitle: data.topTitle,
//     mainTitle: data.mainTitle,
//     bottomTitle: data.bottomTitle,
//     leftButtonText: data.leftButtonText,
//     leftButtonUrl: data.leftButtonUrl,
//     rightButtonText: data.rightButtonText,
//     rightButtonUrl: data.rightButtonUrl,
//     DisplayNo: data.DisplayNo,
//     IsActive: data.IsActive,
//   });

//   res.status(200).json({
//     success: true,
//     homeBanner,
//     message: "Home banner Data Added Successfully",
//   });
// });



exports.createHomeBanner = catchAsyncError(async (req, res, next) => {
  const data = req.body;

  if (!req.file) {
    return next(new ErrorHandler("Image is required", 400));
  }

  const file = req.file.filename;

  const homeBanner = await HomeBanner.create({
    file,
    topTitle: data.topTitle,
    mainTitle: data.mainTitle,
    bottomTitle: data.bottomTitle,
    leftButtonText: data.leftButtonText,
    leftButtonUrl: data.leftButtonUrl,
    rightButtonText: data.rightButtonText,
    rightButtonUrl: data.rightButtonUrl,
    DisplayNo: data.DisplayNo,
    IsActive: data.IsActive,
  });

  res.status(200).json({
    success: true,
    homeBanner,
    message: "Home banner Data Added Successfully",
  });
});

// GET ALL
exports.getAllHomeBanner = catchAsyncError(async (req, res, next) => {
  const allHomeBanners = await HomeBanner.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, allHomeBanners });
});

// DELETE
exports.deleteHomeBanner = catchAsyncError(async (req, res, next) => {
  const homeBanner = await HomeBanner.findById(req.params.id);
  if (!homeBanner) {
    return next(new ErrorHandler("Home Banner not found", 404));
  }

  // const imageId = homeBanner.file?.public_id;
  // if (imageId) {
  //   try {
  //     await cloudinary.v2.uploader.destroy(imageId);
  //   } catch (err) {
  //     console.error("Cloudinary deletion error:", err);
  //     return next(new ErrorHandler("Failed to delete image", 500));
  //   }
  // }
  const oldImagePath = path.join(__dirname, "../uploads/banner", homeBanner.file);
  console.log("Old image full path:", oldImagePath);

  if (fs.existsSync(oldImagePath)) {
    fs.unlinkSync(oldImagePath);
    console.log("Old image deleted successfully:", oldImagePath);
  } else {
    console.log("Old image does not exist, skipping deletion:", oldImagePath);
  }

  await homeBanner.deleteOne();

  res.status(200).json({
    success: true,
    message: "Home Banner deleted Successfully",
  });
});

// UPDATE
// exports.updateHomebanner = catchAsyncError(async (req, res, next) => {
//   const data = req.body;
//   const homebanner = await HomeBanner.findById(req.params.id);
//   if (!homebanner) {
//     return next(new ErrorHandler("Home Banner not found", 404));
//   }

//   const newUserData = {
//     topTitle: data.topTitle,
//     mainTitle: data.mainTitle,
//     bottomTitle: data.bottomTitle,
//     leftButtonText: data.leftButtonText,
//     leftButtonUrl: data.leftButtonUrl,
//     rightButtonText: data.rightButtonText,
//     rightButtonUrl: data.rightButtonUrl,
//     DisplayNo: data.DisplayNo,
//     IsActive: data.IsActive,
//   };

//   if (req.files && req.files.file) {
//     const file = req.files.file;
//     const originalName = path.parse(file.name).name;

//     // Delete old image
//     // const imageId = homebanner.file?.public_id;
//     // if (imageId) {
//     //   try {
//     //     await cloudinary.v2.uploader.destroy(imageId);
//     //   } catch (err) {
//     //     console.error("Cloudinary deletion error:", err);
//     //     return next(new ErrorHandler("Failed to delete old image", 500));
//     //   }
//     // }

//     const sanitizedFileName = originalName.replace(/\s+/g, "_");

//     const tempCompressedPath = path.join(
//       os.tmpdir(),
//       `compressed_${sanitizedFileName}.webp`
//     );

//     await sharp(file.tempFilePath)
//       .resize({ width: 1200 })
//       .webp({ quality: 60 })
//       .toFile(tempCompressedPath);

//     const stats = fs.statSync(tempCompressedPath);
//     const fileSizeInKB = Math.round(stats.size / 1024);
//     console.log("✅ Compressed image size:", fileSizeInKB, "KB");

//     // Upload new image
//     const mycloud = await cloudinary.v2.uploader.upload(tempCompressedPath, {
//       folder: "HomeBanners",
//       public_id: sanitizedFileName,
//       use_filename: true,
//       unique_filename: false,
//       overwrite: true,
//       resource_type: "image",
//     });

//     fs.unlinkSync(tempCompressedPath);

//     newUserData.file = {
//       public_id: mycloud.public_id,
//       url: mycloud.secure_url,
//     };
//   }

//   const response = await HomeBanner.findByIdAndUpdate(req.params.id, newUserData, {
//     new: true,
//     runValidators: true,
//   });

//   res.status(200).json({
//     success: true,
//     response,
//     message: "Home Banner Updated Successfully !!",
//   });
// });


exports.updateHomebanner = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  console.log("data kya mila re", data);
  console.log("Uploaded file:", req.file);

  const homebanner = await HomeBanner.findById(req.params.id);
  if (!homebanner) {
    return next(new ErrorHandler(`HomeBanner not found with Id: ${req.params.id}`, 404));
  }

  // Agar file same hai, to delete mat karo
  if (homebanner.file === data.file) {
    const response = await HomeBanner.findByIdAndUpdate(req.params.id, data, { new: true });
    return res.status(200).json({
      success: true,
      response,
      message: "Home Banner Updated Successfully !!",
    });
  }

  // ✅ Correct path
  const oldImagePath = path.join(__dirname, "../uploads/banner", homebanner.file);
  console.log("Old image full path:", oldImagePath);

  try {
    // ✅ Check if file exists before deleting
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
      console.log("Old image deleted successfully:", oldImagePath);
    } else {
      console.log("Old image does not exist, skipping deletion:", oldImagePath);
    }

    // ✅ New data
    const newUserData = {
      file: req.file ? path.basename(req.file.path) : homebanner.file,
      topTitle: data.topTitle,
      mainTitle: data.mainTitle,
      bottomTitle: data.bottomTitle,
      leftButtonText: data.leftButtonText,
      leftButtonUrl: data.leftButtonUrl,
      rightButtonText: data.rightButtonText,
      rightButtonUrl: data.rightButtonUrl,
      DisplayNo: data.DisplayNo,
      IsActive: data.IsActive,
    };

    const response = await HomeBanner.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      response,
      message: "Home Banner Updated Successfully !!",
    });
  } catch (err) {
    console.error("Error deleting old image:", err);
    return next(new ErrorHandler("Error deleting old image", 500));
  }
});


// Banner Style 

// exports.updateBannerStyle = catchAsyncError(async (req, res, next) => {
//   const { id } = req.body;
//   console.log(id)

//   if (!id) {
//     return res.status(400).json({ success: false, message: "Banner style required" });
//   }

//   // 🧩 Update all documents OR maintain separate config document
//   // Option 1: Update single global record (recommended if you have one banner group)
//   const existing = await HomeBanner.find(); // ya config collection
//   if (!existing) {
//     return res.status(404).json({ success: false, message: "No banner found" });
//   }

//   existing.bannerStyle = id;
//   await existing.save();

//   return res.status(200).json({
//     success: true,  
//     message: `Banner style updated to ${id}`,
//     id,
//   });
// });




exports.updateBannerStyle = catchAsyncError(async (req, res, next) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ success: false, message: "Banner style required" });
  }

  // 🔄 Update all banners
  const result = await HomeBanner.updateMany({}, { bannerStyle: id });

  return res.status(200).json({
    success: true,
    message: `Banner style updated for ${result.modifiedCount} banners`,
    id,
  });
});
 