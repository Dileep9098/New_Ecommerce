const path = require("path");
const catchAsyncError = require("../Middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");
const fs = require('fs');
const HotDealBanner = require("../Models/hotDealProductModel");
const os = require("os");
const sharp = require("sharp");

const cloudinary = require("cloudinary");


// exports.createHotDealBanner = catchAsyncError(async (req, res, next) => {
//     const data = req.body
//     const file = req.file ? path.basename(req.file.path) : req.file
//     console.log(data)
//     console.log(file)
//     console.log("File ka name kya",req.file)

//     const hotDealBanner = await HotDealBanner.create({
//         file,
//         topTitle: data.topTitle,
//         mainTitle: data.mainTitle,
//         bottomTitle: data.bottomTitle,
//         dealMainText: data.dealMainText,
//         dealMainUrl: data.dealMainUrl,
//         IsActive: data.IsActive,
//         AvailableStartDate: data.AvailableStartDate || '',
//         AvailableEndDate: data.AvailableEndDate || '',
//     })
//     if (!hotDealBanner) {
//         return next(ErrorHandler("HotDealBanner does not Added", 400))
//     }

//     res.status(200).json({
//         success: true,
//         hotDealBanner,
//         message: "Hot Deal Product Added Successfully"
//     })
// })

// exports.createHotDealBanner = catchAsyncError(async (req, res, next) => {
//     const data = req.body;

//     if (!req.files || !req.files.file) {
//         return next(new ErrorHandler("Image file is required", 400));
//     }

//     const file = req.files.file;
//     const isLargeImage = file.size > 204800;  // 500 KB

//     const uploaded = await cloudinary.uploader.upload(file.tempFilePath, {
//         folder: "HotDealBanners",
//         use_filename: true,
//         unique_filename: false,
//         quality: isLargeImage ? "auto:low" : "auto",
//     });

//     const hotDealBanner = await HotDealBanner.create({
//         file: {
//             public_id: uploaded.public_id,
//             url: uploaded.secure_url,
//         },
//         topTitle: data.topTitle,
//         mainTitle: data.mainTitle,
//         bottomTitle: data.bottomTitle,
//         dealMainText: data.dealMainText,
//         dealMainUrl: data.dealMainUrl,
//         IsActive: data.IsActive,
//         AvailableStartDate: data.AvailableStartDate || "",
//         AvailableEndDate: data.AvailableEndDate || "",
//     });

//     res.status(200).json({
//         success: true,
//         hotDealBanner,
//         message: "Hot Deal Product Added Successfully",
//     });
// });




exports.createHotDealBanner = catchAsyncError(async (req, res, next) => {
    const data = req.body;
    const file = req.file.filename;


    const hotDealBanner = await HotDealBanner.create({
        file,
        topTitle: data.topTitle,
        mainTitle: data.mainTitle,
        bottomTitle: data.bottomTitle,
        dealMainText: data.dealMainText,
        dealMainUrl: data.dealMainUrl,
        IsActive: data.IsActive,
        AvailableStartDate: data.AvailableStartDate || "",
        AvailableEndDate: data.AvailableEndDate || "",
    });

    res.status(200).json({
        success: true,
        hotDealBanner,
        message: "Hot Deal Product Added Successfully",
    });
});

exports.getAllHotDealBanner = catchAsyncError(async (req, res, next) => {

    const allHotDealBanner = await HotDealBanner.find().sort({ createdAt: -1 })
    if (!allHotDealBanner) {
        return next(ErrorHandler("Home Banner Not Found", 400))
    }
    res.status(200).json({
        success: true,
        allHotDealBanner

    })
})


exports.deleteHotDealBanner = catchAsyncError(async (req, res, next) => {

    const id = req.body
    console.log(id)
    const hotDealBanner = await HotDealBanner.findById(req.params.id);
    console.log(hotDealBanner)

    if (!hotDealBanner) {
        return next(new ErrorHandler(`User does not exite with Id : ${req.params.id}`))
    }

    // if (hotDealBanner.file) {
    //     const oldImagePath = ('../uploads/', hotDealBanner.file);
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

    const oldImagePath = path.join(__dirname, "../uploads/banner", hotDealBanner.file);
    console.log("Old image full path:", oldImagePath);

    if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
        console.log("Old image deleted successfully:", oldImagePath);
    } else {
        console.log("Old image does not exist, skipping deletion:", oldImagePath);
    }
    await hotDealBanner.deleteOne();

    res.status(200).json({
        success: true,
        message: "Hot Deal Banner deleted Successfully"
    });

})


// exports.updateHotDealBanner = catchAsyncError(async (req, res, next) => {

//     const data = req.body


//     const hotDealBanner = await HotDealBanner.findById(req.params.id);
//     console.log(hotDealBanner)
//     if (!hotDealBanner) {
//         return next(new ErrorHandler(`User does not exite with Id : ${req.params.id}`))
//     }
//     if (hotDealBanner.file === data.file) {
//         const response = await HotDealBanner.findByIdAndUpdate(req.params.id, data)
//         return res.status(200).json({
//             success: true,
//             response,
//             message: "Hot Deal Banner Successfully !!"

//         })
//     }
//     else {
//         const oldImagePath = ('../uploads/', hotDealBanner.file); // Proper path joining
//         console.log('Old image path:', oldImagePath);

//         try {
//             await fs.unlink(path.join(__dirname, `../uploads/${oldImagePath}`)); // Delete the old image
//             console.log('Old image deleted successfully:', oldImagePath);
//             const newUserData = {
//                 file: req.file ? path.basename(req.file.path) : hotDealBanner.file,
//                 topTitle: data.topTitle,
//                 mainTitle: data.mainTitle,
//                 bottomTitle: data.bottomTitle,
//                 dealMainText: data.dealMainText,
//                 dealMainUrl: data.dealMainUrl,
//                 IsActive: data.IsActive,
//                 AvailableStartDate: data.AvailableStartDate || '',
//                 AvailableEndDate: data.AvailableEndDate || '',
//             };
//             console.log(newUserData)
//             const response = await HotDealBanner.findByIdAndUpdate(req.params.id, newUserData, { new: true, runValidators: true, })
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


// })




exports.updateHotDealBanner = catchAsyncError(async (req, res, next) => {
    const data = req.body;

    const hotDealBanner = await HotDealBanner.findById(req.params.id);
    if (!hotDealBanner) {
        return next(new ErrorHandler(`Hot Deal Banner not found with Id: ${req.params.id}`));
    }

    // const newUserData = {
    //     topTitle: data.topTitle,
    //     mainTitle: data.mainTitle,
    //     bottomTitle: data.bottomTitle,
    //     dealMainText: data.dealMainText,
    //     dealMainUrl: data.dealMainUrl,
    //     IsActive: data.IsActive,
    //     AvailableStartDate: data.AvailableStartDate || '',
    //     AvailableEndDate: data.AvailableEndDate || '',
    // };


    // const response = await HotDealBanner.findByIdAndUpdate(
    //     req.params.id,
    //     newUserData,
    //     { new: true, runValidators: true }
    // );

    // res.status(200).json({
    //     success: true,
    //     response,
    //     message: "Hot Deal Banner Updated Successfully !!"
    // });

    if (hotDealBanner.file === data.file) {
        const response = await HotDealBanner.findByIdAndUpdate(req.params.id, {
            file: data.file,
            Name: data.pname,
        }, { new: true });
        return res.status(200).json({
            success: true,
            response,
            message: "hotDeal Banner Updated Successfully !!",
        });
    }

    // ✅ Correct path
    const oldImagePath = path.join(__dirname, "../uploads/banner", hotDealBanner.file);
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
        // const newUserData = {
        //   Name: data.pname,

        // };

        const newUserData = {
            file: req.file ? path.basename(req.file.path) : hotDealBanner.file,
            topTitle: data.topTitle,
            mainTitle: data.mainTitle,
            bottomTitle: data.bottomTitle,
            dealMainText: data.dealMainText,
            dealMainUrl: data.dealMainUrl,
            IsActive: data.IsActive,
            AvailableStartDate: data.AvailableStartDate || '',
            AvailableEndDate: data.AvailableEndDate || '',
        };

        const response = await HotDealBanner.findByIdAndUpdate(req.params.id, newUserData, {
            new: true,
            runValidators: true,
        });

        return res.status(200).json({
            success: true,
            response,
            message: "Hot Deal Banner Updated Successfully !!",
        });
    } catch (err) {
        console.error("Error deleting old image:", err);
        return next(new ErrorHandler("Error deleting old image", 500));
    }

});