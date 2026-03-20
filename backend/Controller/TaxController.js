const catchAsyncError = require("../Middlewares/catchAsyncError");
const TaxModel = require("../Models/TaxModel");
const ErrorHandler = require("../utils/errorhandler");



exports.addTaxDetails = catchAsyncError(async (req, res, next) => {
    const { tax_name, tax_rate, tax_type, country, state, IsActive } = req.body;

    // Check if both name and displaySeqNo already exist in the database

    if (!tax_name) {
        return res.status(400).json({
            success: false,
            message: "TAX Name is required"
        });
    }

    const taxDetail = await TaxModel.create({ tax_name, tax_rate, tax_type, country, state, IsActive });

    if (!taxDetail) {
        return next(ErrorHandler("Tax Details was not added", 400));
    }

    res.status(200).json({
        success: true,
        taxDetail,
        message: "Tax Details added successfully"
    });
});


exports.getAllTaxDetails = catchAsyncError(async (req, res, next) => {

    const taxDetails = await TaxModel.find()
    if (!taxDetails) {
        return next(ErrorHandler(" tax Details Not Found", 400))
    }
    res.status(200).json({
        success: true,
        taxDetails

    })

})

exports.deleteTaxDetail = catchAsyncError(async (req, res, next) => {
    const id = req.body
    console.log(id)
    const taxDetail = await TaxModel.findById(req.params.id);
    console.log(taxDetail)



    await taxDetail.deleteOne();

    res.status(200).json({
        success: true,
        message: "Tax Details deleted Successfully"
    });

})

exports.updateTaxDetail = catchAsyncError(async (req, res, next) => {

    const tax_name = req.body.tax_name
    const tax_type = req.body.tax_type
    const tax_rate = req.body.tax_rate
    const country = req.body.country
    const state = req.body.state
    const IsActive = req.body.IsActive

    const taxDetail = await TaxModel.findById(req.params.id);
    console.log(taxDetail)
    if (!taxDetail) {
        return next(new ErrorHandler(`Tax Details does not exite with Id : ${req.params.id}`))
    }

    const newUserData = {
        tax_name: tax_name,
        tax_type: tax_type,
        tax_rate: tax_rate,
        country: country,
        state: state,
        IsActive: IsActive,
    };
    console.log(newUserData)
    const response = await TaxModel.findByIdAndUpdate(req.params.id, newUserData, { new: true, runValidators: true, })
    return res.status(200).json({
        success: true,
        response,
        message: "Tax Details Updated Successfully !!"
    })

})
