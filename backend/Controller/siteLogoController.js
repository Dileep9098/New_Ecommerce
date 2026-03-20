// const path=require("path")
// const catchAsyncError = require("../Middlewares/catchAsyncError");
// const ErrorHandler = require("../utils/errorhandler");
// const fs = require('fs/promises');
// const SiteLogo = require("../Models/siteLogoModel");



// exports.createSiteLogo = catchAsyncError(async (req, res, next) => {
//     const data = req.body
//     const file = req.file ? path.basename(req.file.path) : req.file
//     console.log(data)
//     console.log(file)

//     const siteLogo = await SiteLogo.create({
//         file,
//         logoName: data.logoName,
//         logoUrl: data.logoUrl,

//     })
//     if (!siteLogo) {
//         return next(ErrorHandler("siteLogo does not Added", 400))
//     }

//     res.status(200).json({
//         success: true,
//         siteLogo,
//         message: "Site Logo Added Successfully"
//     })
// })

// exports.getAllSiteLogo = catchAsyncError(async (req, res, next) => {

//     const allSiteLogo = await SiteLogo.find().sort({ createdAt: -1 })
//     if (!allSiteLogo) {
//         return next(ErrorHandler("SiteLogo Not Found", 400))
//     }
//     res.status(200).json({
//         success: true,
//         allSiteLogo

//     })
// })


// exports.deleteSiteLogo = catchAsyncError(async (req, res, next) => {

//     const id = req.body
//     console.log(id)
//     const siteLogo = await SiteLogo.findById(req.params.id);
//     console.log(siteLogo)

//     if (!siteLogo) {
//         return next(new ErrorHandler(`Site Logo does not exite with Id : ${req.params.id}`))
//     }

//     if (siteLogo.file) {
//         const oldImagePath = ('../uploads//', siteLogo.file);
//         console.log('Old image path:', oldImagePath);

//         try {
//             await fs.unlink(path.join(__dirname, `../uploads//${oldImagePath}`)); // Delete the old image
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

//     await siteLogo.deleteOne();

//     res.status(200).json({
//         success: true,
//         message: "Site Logo deleted Successfully"
//     });

// })


// exports.updateSiteLogo = catchAsyncError(async (req, res, next) => {

//     const data = req.body
//     console.log("data kya mila re", data)
//     // console.log("data kya mila re", data.name)
//     // console.log("data kya mila re", data.file)
//     // const file = req.file ? path.basename(req.file.path) : req.file

//     console.log('Uploaded file:', req.file);

//     const siteLogo = await SiteLogo.findById(req.params.id);
//     console.log(siteLogo)
//     if (!siteLogo) {
//         return next(new ErrorHandler(`Site Logo does not exite with Id : ${req.params.id}`))
//     }
//     if (siteLogo.file === data.file) {
//         const response = await SiteLogo.findByIdAndUpdate(req.params.id, data)
//         return res.status(200).json({
//             success: true,
//             response,
//             message: "Site Logo Updated Successfully !!"

//         })
//     }
//     else {
//         const oldImagePath = ('../uploads//', siteLogo.file); // Proper path joining
//         console.log('Old image path:', oldImagePath);

//         try {
//             await fs.unlink(path.join(__dirname, `../uploads//${oldImagePath}`)); // Delete the old image
//             console.log('Old image deleted successfully:', oldImagePath);
//             const newUserData = {
//                 file: req.file ? path.basename(req.file.path) : siteLogo.file,
//                 logoName: data.logoName,
//                 logoUrl: data.logoUrl,
//             };
//             console.log(newUserData)
//             const response = await SiteLogo.findByIdAndUpdate(req.params.id, newUserData, { new: true, runValidators: true, })
//             return res.status(200).json({
//                 success: true,
//                 response,
//                 message: "Site Logo Updated Successfully !!"
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
const fs = require('fs/promises');
const SiteLogo = require("../Models/siteLogoModel");
const cloudinary = require("cloudinary");

// Create Site Logo
exports.createSiteLogo = catchAsyncError(async (req, res, next) => {
    const data = req.body;
    const file = req.file ? path.basename(req.file.path) : null; // Ensure file is captured
    console.log('Received Data:', data);
    console.log('File:', file);
    const mycloud = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "logo",
        width: 150,
        crop: "scale"
    })
    const siteLogo = await SiteLogo.create({
        file: {
            public_id: mycloud.public_id,
            url: mycloud.secure_url
        },
        logoName: data.logoName,
        logoUrl: data.logoUrl,
    });

    if (!siteLogo) {
        return next(new ErrorHandler("SiteLogo does not added", 400));
    }

    res.status(200).json({
        success: true,
        siteLogo,
        message: "Site Logo Added Successfully"
    });
});

// Get All Site Logos
exports.getAllSiteLogo = catchAsyncError(async (req, res, next) => {
    const allSiteLogo = await SiteLogo.find().sort({ createdAt: -1 });
    if (!allSiteLogo) {
        return next(new ErrorHandler("SiteLogo Not Found", 400));
    }

    res.status(200).json({
        success: true,
        allSiteLogo
    });
});

// Delete Site Logo
exports.deleteSiteLogo = catchAsyncError(async (req, res, next) => {
    const siteLogo = await SiteLogo.findById(req.params.id);
    if (!siteLogo) {
        return next(new ErrorHandler(`Site Logo does not exist with Id : ${req.params.id}`, 404));
    }

    // if (siteLogo.file) {
    //     const oldImagePath = path.join(__dirname, '../uploads/', siteLogo.file);
    //     console.log('Old image path:', oldImagePath);

    //     try {
    //         await fs.unlink(oldImagePath); // Delete the old image
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
    const imageId = siteLogo.file?.public_id;
    if (imageId) {
        await cloudinary.v2.uploader.destroy(imageId);
    }
    await siteLogo.deleteOne();
    res.status(200).json({
        success: true,
        message: "Site Logo deleted Successfully"
    });
});

// Update Site Logo
exports.updateSiteLogo = catchAsyncError(async (req, res, next) => {
    const data = req.body;
    const siteLogo = await SiteLogo.findById(req.params.id);
    if (!siteLogo) {
        return next(new ErrorHandler(`Site Logo does not exist with Id : ${req.params.id}`, 404));
    }

    if (siteLogo.file === data.file) {
        const response = await SiteLogo.findByIdAndUpdate(req.params.id, data);
        return res.status(200).json({
            success: true,
            response,
            message: "Site Logo Updated Successfully"
        });
    } else {
        // const oldImagePath = path.join(__dirname, '../uploads/', siteLogo.file);
        // console.log('Old image path:', oldImagePath);

        // try {
        //     await fs.unlink(oldImagePath); // Delete the old image
        //     console.log('Old image deleted successfully:', oldImagePath);
        // } catch (err) {
        //     if (err.code === 'ENOENT') {
        //         console.log('Old image does not exist, skipping deletion:', oldImagePath);
        //     } else {
        //         console.error('Error deleting old image:', err);
        //         return next(new ErrorHandler('Error deleting old image', 500));
        //     }
        // }
        const imageId = siteLogo.file?.public_id;
        if (imageId) {
            await cloudinary.v2.uploader.destroy(imageId);
        }
const mycloud = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "logo",
        width: 150,
        crop: "scale"
    })
        // Update the site logo with new data
        const newLogoData = {
            file: req.file ? path.basename(req.file.path) : siteLogo.file,
            logoName: data.logoName,
            logoUrl: data.logoUrl,
        };

        const response = await SiteLogo.findByIdAndUpdate(req.params.id, newLogoData, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            response,
            message: "Site Logo Updated Successfully"
        });
    }
});

