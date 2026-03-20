const catchAsyncError = require("../Middlewares/catchAsyncError");
const PaymentMethod = require("../Models/paymentsMethodModel");
const ErrorHandler = require("../utils/errorhandler");

exports.addPaymentMethod = catchAsyncError(async (req, res, next) => {
    const { name, IsActive, displaySeqNo } = req.body;
    // Check for missing fields before querying the DB 

    if (!name || !displaySeqNo) {
        return res.status(400).json({
            success: false,
            message: "Name and display sequence number are required"
        });
    }

    console.log('Received Data:', { name, IsActive, displaySeqNo });


    const checkData = await PaymentMethod.findOne({
        $or: [
            { name },
            { displaySeqNo }
        ]
    });
    console.log("Previous Data", checkData);

    if (checkData) {
        return res.status(400).json({
            success: false,
            message: "Payments Method with this name and display sequence number already exists."
        });
    }

    if (!name) {
        return res.status(400).json({
            success: false,
            message: "Name is required"
        });
    }

    const paymentMethod = await PaymentMethod.create({ name, IsActive, displaySeqNo });

    if (!paymentMethod) {
        return next(ErrorHandler("Payments Method was not added", 400));
    }

    res.status(200).json({
        success: true,
        paymentMethod,
        message: "Payments Method added successfully"
    });
});


exports.getAllPaymentMethod = catchAsyncError(async (req, res, next) => {

    const paymentMethod = await PaymentMethod.find()
    if (!paymentMethod) {
        return next(ErrorHandler(" Payments Method Not Found", 400))
    }
    res.status(200).json({
        success: true,
        paymentMethod

    })

})

exports.deletePaymentMethod = catchAsyncError(async (req, res, next) => {
    const id = req.body
    console.log(id)
    const paymentsMethod = await PaymentMethod.findById(req.params.id);
    console.log(paymentsMethod)


    await paymentsMethod.deleteOne();

    res.status(200).json({
        success: true,
        message: "Payments Method deleted Successfully"
    });

})

exports.updatePaymentMethod = catchAsyncError(async (req, res, next) => {

    const name = req.body.name
    const IsActive = req.body.IsActive
    const displaySeqNo = req.body.displaySeqNo

    const paymentMethod = await PaymentMethod.findById(req.params.id);
    console.log(paymentMethod)
    if (!paymentMethod) {
        return next(new ErrorHandler(`User does not exite with Id : ${req.params.id}`))
    }

    const newUserData = {
        name: name,
        IsActive: IsActive,
        displaySeqNo: displaySeqNo
    };
    console.log(newUserData)
    const response = await PaymentMethod.findByIdAndUpdate(req.params.id, newUserData, { new: true, runValidators: true, })
    return res.status(200).json({
        success: true,
        response,
        message: "Payments Method Updated Successfully !!"
    })

})
