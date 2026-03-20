const path = require('path');
const catchAsyncError = require("../Middlewares/catchAsyncError");
const ParentCategory = require("../Models/ParentCategoryModel");
const ErrorHandler = require("../utils/errorhandler");
const ChildCategory = require('../Models/childCategoryModel');
const fs = require('fs');
const os = require("os");
const sharp = require("sharp");
const cloudinary = require("cloudinary");


exports.parentCategory = catchAsyncError(async (req, res, next) => {
  const data = req.body
  const file = req.file.filename;

  // const file = req.file ? path.basename(req.file.path) : req.file
  // console.log(data, file)

  // const file = req.files.file;
  console.log(file)
  // const originalName = path.parse(file.name).name;
  // const sanitizedFileName = originalName.replace(/\s+/g, "_");

  // const tempCompressedPath = path.join(
  //   os.tmpdir(),
  //   `compressed_${sanitizedFileName}.webp`
  // );

  // await sharp(file.tempFilePath).resize({ width: 1200 })
  //   .webp({ quality: 60 })
  //   .toFile(tempCompressedPath);

  // const stats = fs.statSync(tempCompressedPath);
  // const fileSizeInKB = Math.round(stats.size / 1024);
  // console.log("✅ Compressed image size:", fileSizeInKB, "KB");
  // // Upload directly to Cloudinary
  // const mycloud = await cloudinary.v2.uploader.upload(tempCompressedPath, {
  //   folder: "Category",
  //   public_id: sanitizedFileName,
  //   use_filename: true,
  //   unique_filename: false,
  //   overwrite: true,
  //   resource_type: "image",
  // });
  // fs.unlinkSync(tempCompressedPath);

  const category = await ParentCategory.create({
    Name: data.pname, file
  })

  if (!category) {
    return next(ErrorHandler("Category does not Added", 400))
  }
  res.status(200).json({
    success: true,
    category
  })
})

exports.getAllParentCategory = catchAsyncError(async (req, res, next) => {

  const category = await ParentCategory.find()
  if (!category) {
    return next(ErrorHandler("Parent Category Not Found", 400))
  }
  res.status(200).json({
    success: true,
    category

  })

})


exports.deleteParentCategory = catchAsyncError(async (req, res, next) => {
  const id = req.body
  console.log(id)
  const parentId = await ParentCategory.findById(req.params.id);
  console.log(parentId)

  const checkSubcategory = await ChildCategory.find({
    parentCategory: {
      "$in": [req.params.id]
    }
  }).countDocuments()

  //   after make Product Model then change this 

  // const checkProduct=await Product.find({
  //     category:{
  //         "$in":[_id]
  //     }
  // }).countDocuments()

  if (checkSubcategory > 0) {
    return res.status(200).json({
      success: false,
      message: "Category is already use can't delete",
      error: true
    })
  }

  if (!parentId) {
    return next(new ErrorHandler(`User does not exite with Id : ${req.params.id}`))
  }
  // if (parentId.file) {
  //     const oldImagePath = ('../uploads/', parentId.file);
  //     console.log('Old image path:', oldImagePath);

  //     try {
  //         await fs.unlink(path.join(__dirname, `../uploads/${oldImagePath}`)); // Delete the old image
  //         console.log('Old image deleted successfully:', oldImagePath);
  //     } catch (err) {
  //         if (err.code === 'ENOENT') {
  //             console.log('Old image does not exist, skipping deletion:', oldImagePath);
  //         } else {
  //             console.error('Error deleting old image:', err);
  //             return next(new ErrorHandler('Error deleting old image', 500));
  //         }
  //     }
  // }
  // const imageId = parentId.file?.public_id;
  // if (imageId) {
  //   await cloudinary.v2.uploader.destroy(imageId);
  // }

  const oldImagePath = path.join(__dirname, "../uploads/category", parentId.file);
  console.log("Old image full path:", oldImagePath);

  if (fs.existsSync(oldImagePath)) {
    fs.unlinkSync(oldImagePath);
    console.log("Old image deleted successfully:", oldImagePath);
  } else {
    console.log("Old image does not exist, skipping deletion:", oldImagePath);
  }

  await parentId.deleteOne();

  res.status(200).json({
    success: true,
    message: "Category deleted Successfully"
  });

})


// exports.updateParentCategory = catchAsyncError(async (req, res, next) => {

//     const data = req.body
//     console.log("data kya mila re", data)
//     console.log("data kya mila re", data.pname)
//     console.log("data kya mila re", data.file)
//     // const file = req.file ? path.basename(req.file.path) : req.file

//     console.log('Uploaded file:', req.file);

//     const parentId = await ParentCategory.findById(req.params.id);
//     console.log(parentId)
//     if (!parentId) {
//         return next(new ErrorHandler(`User does not exite with Id : ${req.params.id}`))
//     }
//     if (parentId.file === data.file) {
//         const response = await ParentCategory.findByIdAndUpdate(req.params.id, { Name: data.pname })
//         return res.status(200).json({
//             success: true,
//             response,
//             message: "Category Updated Successfully !!"

//         })
//     }
//     else {
//         const oldImagePath = ('../uploads/', parentId.file); // Proper path joining
//         console.log('Old image path:', oldImagePath);

//         try {
//             await fs.unlink(path.join(__dirname, `../uploads/${oldImagePath}`)); // Delete the old image
//             console.log('Old image deleted successfully:', oldImagePath);
//             const newUserData = {
//                 Name: data.pname,
//                 file: req.file ? path.basename(req.file.path) : parentId.file,
//             };
//             console.log(newUserData)
//             const response = await ParentCategory.findByIdAndUpdate(req.params.id, newUserData, { new: true, runValidators: true, })
//             return res.status(200).json({
//                 success: true,
//                 response,
//                 message: "Category Updated Successfully !!"
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


// Convert into Cloudinary upload and update logic

exports.updateParentCategory = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  console.log(data)
  const category = await ParentCategory.findById(req.params.id);

  if (!category) {
    return next(new ErrorHandler(`Category not found with ID: ${req.params.id}`, 404));
  }

  // New data to update
  // const newUserData = {
  //   Name: data.pname,
  // };

  // If file is uploaded, handle Cloudinary logic
  // if (req.files && req.files.file) {
  //   // Delete old image from Cloudinary
  //   const imageId = category.file?.public_id;
  //   if (imageId) {
  //     await cloudinary.v2.uploader.destroy(imageId);
  //   }
  //   const file = req.files.file;
  //   const originalName = path.parse(file.name).name;
  //   const sanitizedFileName = originalName.replace(/\s+/g, "_");

  //   const tempCompressedPath = path.join(
  //     os.tmpdir(),
  //     `compressed_${sanitizedFileName}.webp`
  //   );

  //   await sharp(file.tempFilePath)
  //     .resize({ width: 1200 })
  //     .webp({ quality: 60 })
  //     .toFile(tempCompressedPath);

  //   const stats = fs.statSync(tempCompressedPath);
  //   const fileSizeInKB = Math.round(stats.size / 1024);
  //   console.log("✅ Compressed image size:", fileSizeInKB, "KB");


  //   // Upload new image to Cloudinary
  //   const mycloud = await cloudinary.v2.uploader.upload(tempCompressedPath, {
  //     folder: "Category",
  //     public_id: sanitizedFileName,

  //     use_filename: true,
  //     unique_filename: false,
  //     overwrite: true,
  //     resource_type: "image",
  //   });
  //   fs.unlinkSync(tempCompressedPath);


  //   // Add new image data
  //   newUserData.file = {
  //     public_id: mycloud.public_id,
  //     url: mycloud.secure_url,
  //   };
  // }
  if (category.file === data.file) {
    const response = await ParentCategory.findByIdAndUpdate(req.params.id, {
      file: data.file,
      Name: data.pname,
    }, { new: true });
    return res.status(200).json({
      success: true,
      response,
      message: "Parent Category Updated Successfully !!",
    });
  }

  // ✅ Correct path
  const oldImagePath = path.join(__dirname, "../uploads/category", category.file);
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
      file: req.file ? path.basename(req.file.path) : category.file,
      Name: data.pname,

    };

    const response = await ParentCategory.findByIdAndUpdate(req.params.id, newUserData, {
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


// ================ +++++ Child Category ++================

exports.childCategory = catchAsyncError(async (req, res, next) => {
  const data = req.body
  // const file = req.file ? path.basename(req.file.path) : req.file
  console.log(data)
  // console.log(file)

  const file = req.file.filename;
  console.log(file)
  // const originalName = path.parse(file.name).name;
  // const sanitizedFileName = originalName.replace(/\s+/g, "_");

  // const tempCompressedPath = path.join(
  //   os.tmpdir(),
  //   `compressed_${sanitizedFileName}.webp`
  // );

  // await sharp(file.tempFilePath).resize({ width: 1200 })
  //   .webp({ quality: 60 })
  //   .toFile(tempCompressedPath);

  // const stats = fs.statSync(tempCompressedPath);
  // const fileSizeInKB = Math.round(stats.size / 1024);
  // console.log("✅ Compressed image size:", fileSizeInKB, "KB");
  // // Upload directly to Cloudinary
  // const mycloud = await cloudinary.v2.uploader.upload(tempCompressedPath, {
  //   folder: "Category",
  //   public_id: sanitizedFileName,
  //   use_filename: true,
  //   unique_filename: false,
  //   overwrite: true,
  //   resource_type: "image"
  // });
  // fs.unlinkSync(tempCompressedPath);

  const category = await ChildCategory.create({
    file,
    Name: data.name,
    IsActive: data.IsActive,
    parentCategory: data.parentCategory
  })
  if (!category) {
    return next(ErrorHandler("Category does not Added", 400))
  }

  res.status(200).json({
    success: true,
    category
  })
})

exports.getAllChildCategory = catchAsyncError(async (req, res, next) => {

  const childCategory = await ChildCategory.find().sort({ createdAt: -1 }).populate("parentCategory")
  if (!childCategory) {
    return next(ErrorHandler("Child Category Not Found", 400))
  }
  res.status(200).json({
    success: true,
    childCategory

  })
})


exports.deleteChildCategory = catchAsyncError(async (req, res, next) => {

  const id = req.body
  console.log(id)
  const parentId = await ChildCategory.findById(req.params.id);
  console.log(parentId)

  // const checkSubcategory = await ChildCategory.find({
  //     parentCategory: {
  //         "$in": [req.params.id]
  //     }
  // }).countDocuments()

  //   after make Product Model then change this 

  // const checkProduct=await Product.find({
  //     category:{
  //         "$in":[_id]
  //     }
  // }).countDocuments()

  // if (checkSubcategory > 0) {
  //     return res.status(200).json({
  //         success: false,
  //         message: "Category is already use can't delete",
  //         error: true
  //     })
  // }

  if (!parentId) {
    return next(new ErrorHandler(`User does not exite with Id : ${req.params.id}`))
  }

  // if (parentId.file) {
  //     const oldImagePath = ('../uploads/', parentId.file);
  //     console.log('Old image path:', oldImagePath);

  //     try {
  //         await fs.unlink(path.join(__dirname, `../uploads/${oldImagePath}`)); // Delete the old image
  //         console.log('Old image deleted successfully:', oldImagePath);
  //     } catch (err) {
  //         if (err.code === 'ENOENT') {
  //             console.log('Old image does not exist, skipping deletion:', oldImagePath);
  //         } else {
  //             console.error('Error deleting old image:', err);
  //             return next(new ErrorHandler('Error deleting old image', 500));
  //         }
  //     }
  // }

  // const imageId = parentId.file?.public_id;
  // if (imageId) {
  //   await cloudinary.v2.uploader.destroy(imageId);
  // }

  const oldImagePath = path.join(__dirname, "../uploads/category", parentId.file);
  console.log("Old image full path:", oldImagePath);

  if (fs.existsSync(oldImagePath)) {
    fs.unlinkSync(oldImagePath);
    console.log("Old image deleted successfully:", oldImagePath);
  } else {
    console.log("Old image does not exist, skipping deletion:", oldImagePath);
  }

  await parentId.deleteOne();

  res.status(200).json({
    success: true,
    message: "Child Category deleted Successfully"
  });

})


// exports.updateChildCategory = catchAsyncError(async (req, res, next) => {

//     const data = req.body
//     console.log("data kya mila re", data)
//     console.log("data kya mila re", data.name)
//     console.log("data kya mila re", data.file)
//     // const file = req.file ? path.basename(req.file.path) : req.file

//     console.log('Uploaded file:', req.file);

//     const parentId = await ChildCategory.findById(req.params.id);
//     console.log(parentId)
//     if (!parentId) {
//         return next(new ErrorHandler(`User does not exite with Id : ${req.params.id}`))
//     }
//     if (parentId.file === req.file) {
//         const response = await ChildCategory.findByIdAndUpdate(req.params.id,data )
//         return res.status(200).json({
//             success: true,
//             response,
//             message: "Category Updated Successfully !!"

//         })
//     }
//     else {
//         const oldImagePath = ('../uploads/', parentId.file); 
//         console.log('Old image path:', oldImagePath);

//         try {
//             await fs.unlink(path.join(__dirname, `../uploads/${oldImagePath}`)); // Delete the old image
//             console.log('Old image deleted successfully:', oldImagePath);
//             const newUserData = {
//                 Name: data.name,
//                 file: req.file ? path.basename(req.file.path) : parentId.file,
//                 parentCategory:data.parentCategory,
//                 IsActive:data.IsActive
//             };
//             console.log(newUserData)
//             const response = await ChildCategory.findByIdAndUpdate(req.params.id, newUserData, { new: true, runValidators: true, })
//             return res.status(200).json({
//                 success: true,
//                 response,
//                 message: "Category Updated Successfully !!"
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

// exports.updateChildCategory = catchAsyncError(async (req, res, next) => {

//     const data = req.body;
//     console.log("data kya mila re", data);
//     console.log("data kya mila re", data.name);
//     console.log("data kya mila re", data.file);

//     console.log('Uploaded file:', req.file);

//     const parentId = await ChildCategory.findById(req.params.id);
//     console.log(parentId);

//     if (!parentId) {
//         return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`));
//     }

//     // Check if there's a new file in the request
//     const newFile = req.file ? path.basename(req.file.path) : parentId.file;

//     if (parentId.file !== newFile) {
//         // If the file has changed, delete the old one
//         const oldImagePath = path.join(__dirname, `../uploads/${parentId.file}`);
//         console.log('Old image path:', oldImagePath);

//         try {
//             // Check if the old image exists and delete it
//             await fs.unlink(oldImagePath);
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

//     // Prepare the new data to update the category, including the file field
//     const newUserData = {
//         name: data.name,
//         file: newFile,
//         parentCategory: data.parentCategory,
//         IsActive: data.IsActive
//     };

//     console.log(newUserData);

//     // Update the category with the new data
//     const response = await ChildCategory.findByIdAndUpdate(req.params.id, newUserData, { new: true, runValidators: true });

//     return res.status(200).json({
//         success: true,
//         response,
//         message: "Category Updated Successfully !!"
//     });
// });



// Convert into Cloudinary upload and update logic

exports.updateChildCategory = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  console.log("Received Data:", data);
  console.log("Received Data:", req.file);

  const category = await ChildCategory.findById(req.params.id);
  if (!category) {
    return next(new ErrorHandler(`Child Category not found with ID: ${req.params.id}`, 404));
  }

  // Prepare updated data object
  // const newUserData = {
  //   name: data.name,
  //   parentCategory: data.parentCategory,
  //   IsActive: data.IsActive,
  // };

  // If a new image is uploaded
  // if (req.files && req.files.file) {
  //   const file = req.files.file;
  //   const originalName = path.parse(file.name).name;

  //   // Delete old image from Cloudinary
  //   const imageId = category.file?.public_id;
  //   if (imageId) {
  //     try {
  //       await cloudinary.v2.uploader.destroy(imageId);
  //       console.log("Old image deleted:", imageId);
  //     } catch (err) {
  //       console.error("Failed to delete old Cloudinary image:", err);
  //       return next(new ErrorHandler("Error deleting old image", 500));
  //     }
  //   }

  //   const sanitizedFileName = originalName.replace(/\s+/g, "_");

  //   const tempCompressedPath = path.join(
  //     os.tmpdir(),
  //     `compressed_${sanitizedFileName}.webp`
  //   );

  //   await sharp(file.tempFilePath).resize({ width: 1200 })
  //     .webp({ quality: 60 })
  //     .toFile(tempCompressedPath);

  //   const stats = fs.statSync(tempCompressedPath);
  //   const fileSizeInKB = Math.round(stats.size / 1024);
  //   console.log("✅ Compressed image size:", fileSizeInKB, "KB");

  //   // Upload new image to Cloudinary
  //   const mycloud = await cloudinary.v2.uploader.upload(tempCompressedPath, {
  //     folder: "Category",
  //     public_id: sanitizedFileName,
  //     use_filename: true,
  //     unique_filename: false,
  //     overwrite: true,
  //     resource_type: "image",
  //   });
  //   fs.unlinkSync(tempCompressedPath);

  //   newUserData.file = {
  //     public_id: mycloud.public_id,
  //     url: mycloud.secure_url,
  //   };
  // }

  // // Update category
  // const response = await ChildCategory.findByIdAndUpdate(req.params.id, newUserData, {
  //   new: true,
  //   runValidators: true,
  // });

  // res.status(200).json({
  //   success: true,
  //   response,
  //   message: "Child Category Updated Successfully!!",
  // });

  if (category.file === data.file) {
    const response = await ChildCategory.findByIdAndUpdate(req.params.id, {
      file: data.file,
      Name: data.name,
      parentCategory: data.parentCategory,
      IsActive: data.IsActive
    }, { new: true });
    return res.status(200).json({
      success: true,
      response,
      message: "Child Category Updated Successfully !!",
    });
  }

  // ✅ Correct path
  const oldImagePath = path.join(__dirname, "../uploads/category", category.file);
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
      file: req.file ? path.basename(req.file.path) : category.file,
      Name: data.name,
      parentCategory: data.parentCategory,
      IsActive: data.IsActive,
    };

    const response = await ChildCategory.findByIdAndUpdate(req.params.id, newUserData, {
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