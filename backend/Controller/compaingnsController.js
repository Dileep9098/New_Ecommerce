const path = require("path");
const catchAsyncError = require("../Middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");
const fs = require('fs');
const Compaings = require("../Models/compaingnsModel");
const os = require("os");
const sharp = require("sharp");
const cloudinary = require("cloudinary");


exports.createCompaingns = catchAsyncError(async (req, res, next) => {
  const data = req.body
  
  const file = req.file.filename;
  
  const compaingns = await Compaings.create({
    file,
    mainTitle: data.mainTitle,
    body: data.body,
    DiscountTitle: data.DiscountTitle,
    displayStartDate: data.displayStartDate,
    displayEndDate: data.displayEndDate,
    IsActive: data.IsActive,
  })
  if (!compaingns) {
    return next(ErrorHandler("Compaingns does not Added", 400))
  }

  res.status(200).json({
    success: true,
    compaingns,
    message: "Compaings Added Successfully"
  })
})

exports.getAllCompaingns = catchAsyncError(async (req, res, next) => {

  const allCompaingns = await Compaings.find().sort({ createdAt: -1 })
  if (!allCompaingns) {
    return next(ErrorHandler("Compaingns Not Found", 400))
  }
  res.status(200).json({
    success: true,
    allCompaingns

  })
})


exports.deleteCompaingns = catchAsyncError(async (req, res, next) => {

  const id = req.body
  console.log(id)
  const compaingns = await Compaings.findById(req.params.id);
  console.log(compaingns)

  if (!compaingns) {
    return next(new ErrorHandler(`User does not exite with Id : ${req.params.id}`))
  }
 const oldImagePath = path.join(__dirname, "../uploads/banner", compaingns.file);
  console.log("Old image full path:", oldImagePath);

  if (fs.existsSync(oldImagePath)) {
    fs.unlinkSync(oldImagePath);
    console.log("Old image deleted successfully:", oldImagePath);
  } else {
    console.log("Old image does not exist, skipping deletion:", oldImagePath);
  }

  await compaingns.deleteOne();

  res.status(200).json({
    success: true,
    message: "Compaingns deleted Successfully"
  });

})


exports.updateCompaingns = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  console.log("Data mila:", data);

  const compaingns = await Compaings.findById(req.params.id);
  if (!compaingns) {
    return next(new ErrorHandler(`Campaign not found with ID: ${req.params.id}`, 404));
  }
if (compaingns.file === data.file) {
    const response = await Compaings.findByIdAndUpdate(req.params.id, data, { new: true });
    return res.status(200).json({
      success: true,
      response,
      message: "Home Banner Updated Successfully !!",
    });
  }
  // Prepare new update object
  // const newUserData = {
  //   mainTitle: data.mainTitle,
  //   body: data.body,
  //   DiscountTitle: data.DiscountTitle,
  //   displayStartDate: data.displayStartDate,
  //   displayEndDate: data.displayEndDate,
  //   IsActive: data.IsActive,
  // };

    const oldImagePath = path.join(__dirname, "../uploads/banner", Compaings.file);
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
        file: req.file ? path.basename(req.file.path) : Compaings.file,
       mainTitle: data.mainTitle,
    body: data.body,
    DiscountTitle: data.DiscountTitle,
    displayStartDate: data.displayStartDate,
    displayEndDate: data.displayEndDate,
    IsActive: data.IsActive,
      };
  
      const response = await Compaings.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
      });
  
      return res.status(200).json({
        success: true,
        response,
        message: "Campaingns Updated Successfully !!",
      });
    } catch (err) {
      console.error("Error deleting old image:", err);
      return next(new ErrorHandler("Error deleting old image", 500));
    }



  
});