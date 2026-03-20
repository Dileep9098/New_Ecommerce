const catchAsyncError = require("../Middlewares/catchAsyncError");
const ProdcutSize = require("../Models/ProdcutSize");
const ErrorHandler = require("../utils/errorhandler");



exports.addProdcutSize = catchAsyncError(async (req, res, next) => {
    const { name, IsActive ,fullName} = req.body;

    // Check if both name and displaySeqNo already exist in the database

    if (!name) {
        return res.status(400).json({
            success: false,
            message: "Name is required"
        });
    }

    const prodcutSize = await ProdcutSize.create({ name, IsActive ,fullName});

    if (!prodcutSize) {
        return next(ErrorHandler("ProdcutSize was not added", 400));
    }

    res.status(200).json({
        success: true,
        prodcutSize,
        message: "ProdcutSize added successfully"
    });
});


exports.getAllProdcutSizes= catchAsyncError(async (req, res, next) => {

    const ProdcutSizes = await ProdcutSize.find()
    if (!ProdcutSizes) {
        return next(ErrorHandler(" ProdcutSizes Not Found", 400))
    }
    res.status(200).json({
        success: true,
        ProdcutSizes

    })

})

exports.deleteProdcutSizes= catchAsyncError(async (req, res, next) => {
    const id = req.body
    console.log(id)
    const prodcutSize = await ProdcutSize.findById(req.params.id);
    console.log(prodcutSize)

 

    await ProdcutSize.deleteOne();

    res.status(200).json({
        success: true,
        message: "ProdcutSize deleted Successfully"
    });

})

exports.updateProdcutSizes = catchAsyncError(async (req, res, next) => {
   
    const name = req.body.name
    const IsActive = req.body.IsActive
    const fullName = req.body.fullName

    const prodcutSize = await ProdcutSize.findById(req.params.id);
    console.log(prodcutSize)
    if (!prodcutSize) {
        return next(new ErrorHandler(`ProdcutSize does not exite with Id : ${req.params.id}`))
    }
  
    const newUserData = {
       name:name,
       fullName:fullName,
       IsActive:IsActive,
    };
    console.log(newUserData)
    const response = await ProdcutSize.findByIdAndUpdate(req.params.id, newUserData, { new: true, runValidators: true, })
    return res.status(200).json({
        success: true,
        response,
        message: "ProdcutSizes Updated Successfully !!"
    })

})
