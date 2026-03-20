const catchAsyncError = require("../Middlewares/catchAsyncError");
const Menufacturs = require("../Models/menufacturs");
const ErrorHandler = require("../utils/errorhandler");



exports.addMenufacturs = catchAsyncError(async (req, res, next) => {
    const { name, IsActive, displaySeqNo ,address } = req.body;

    // Check if both name and displaySeqNo already exist in the database
    const checkData = await Menufacturs.findOne({
        $or: [
            { name },
            { displaySeqNo }
        ]
    });

    if (checkData) {
        return res.status(400).json({
            success: false,
            message: "Menufacture with this name and display sequence number already exists."
        });
    }

    if (!name) {
        return res.status(400).json({
            success: false,
            message: "Name is required"
        });
    }

    const menufacturs = await Menufacturs.create({ name, IsActive, displaySeqNo,address });

    if (!menufacturs) {
        return next(ErrorHandler("Menufacture was not added", 400));
    }

    res.status(200).json({
        success: true,
        menufacturs,
        message: "Menufacture added successfully"
    });
});


exports.getAllMenufactures= catchAsyncError(async (req, res, next) => {

    const menufactures = await Menufacturs.find()
    if (!menufactures) {
        return next(ErrorHandler(" menufactures Not Found", 400))
    }
    res.status(200).json({
        success: true,
        menufactures

    })

})

exports.deleteMenufactures= catchAsyncError(async (req, res, next) => {
    const id = req.body
    console.log(id)
    const menufacture = await Menufacturs.findById(req.params.id);
    console.log(menufacture)

 

    await menufacture.deleteOne();

    res.status(200).json({
        success: true,
        message: "Category deleted Successfully"
    });

})

exports.updateMenufatures = catchAsyncError(async (req, res, next) => {
   
    const name = req.body.name
    const IsActive = req.body.IsActive
    const displaySeqNo = req.body.displaySeqNo
    const address = req.body.address

    const menufacture = await Menufacturs.findById(req.params.id);
    console.log(menufacture)
    if (!menufacture) {
        return next(new ErrorHandler(`User does not exite with Id : ${req.params.id}`))
    }
  
    const newUserData = {
       name:name,
       IsActive:IsActive,
       displaySeqNo:displaySeqNo,
       address:address
    };
    console.log(newUserData)
    const response = await Menufacturs.findByIdAndUpdate(req.params.id, newUserData, { new: true, runValidators: true, })
    return res.status(200).json({
        success: true,
        response,
        message: "Menufactures Updated Successfully !!"
    })

})
