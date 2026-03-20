const path = require("path");
const catchAsyncError = require("../Middlewares/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");
const fs = require('fs');
const Blog = require("../Models/blogsModel");
const os = require("os");
const sharp = require("sharp");
const cloudinary = require("cloudinary");


// exports.createBlog = catchAsyncError(async (req, res, next) => {
//     const data = req.body
//     const file = req.file ? path.basename(req.file.path) : req.file
//     console.log(data)
//     console.log(file)

    // const mycloud = await cloudinary.v2.uploader.upload(req.file.path, {
    //     folder: "Blogs",
    //     width: 150,
    //     crop: "scale"
    // })

//     const blog = await Blog.create({
//         file: {
//             public_id: mycloud.public_id,
//             url: mycloud.secure_url
//         },
//         mainTitle: data.mainTitle,
//         Descriptions: data.Descriptions,
//         // ProductReviews: data.ProductReviews || [],
//         IsActive: data.IsActive,
//     })
//     if (!blog) {
//         return next(ErrorHandler("blog does not Added", 400))
//     }

//     res.status(200).json({
//         success: true,
//         blog,
//         message: "Blog Data Added Successfully"
//     })
// })

exports.createBlog = catchAsyncError(async (req, res, next) => {
    const data = req.body;
if (!req.file) {
    return next(new ErrorHandler("Image is required", 400));
  }

  const file = req.file.filename;
  

  
    const blog = await Blog.create({
         file,
        mainTitle: data.mainTitle,
        Descriptions: data.Descriptions,
        IsActive: data.IsActive,
    });

    if (!blog) {
        return next(new ErrorHandler("blog does not Added", 400));
    }

    res.status(200).json({
        success: true,
        blog,
        message: "Blog Data Added Successfully",
    });
});



exports.getAllBlogs = catchAsyncError(async (req, res, next) => {

    const AllBlogs = await Blog.find().sort({ createdAt: -1 })
    if (!AllBlogs) {
        return next(ErrorHandler("Blog Not Found", 400))
    }
    res.status(200).json({
        success: true,
        AllBlogs

    })
})


exports.deleteBlog = catchAsyncError(async (req, res, next) => {

    const id = req.body
    console.log(id)
    const blog = await Blog.findById(req.params.id);
    console.log(blog)



    if (!blog) {
        return next(new ErrorHandler(`User does not exite with Id : ${req.params.id}`))
    }
    const imageId = blog.file?.public_id;
    if (imageId) {
        await cloudinary.v2.uploader.destroy(imageId);
    }

    // if (blog.file) {
    //     const oldImagePath = ('../uploads/', blog.file);
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

    await blog.deleteOne();

    res.status(200).json({
        success: true,
        message: "Blog deleted Successfully"
    });

})


// exports.updateBlog = catchAsyncError(async (req, res, next) => {

//     const data = req.body
//     console.log("data kya mila re", data)


//     console.log('Uploaded file:', req.file);

//     const blog = await Blog.findById(req.params.id);
//     console.log(blog)
//     if (!blog) {
//         return next(new ErrorHandler(`Blog does Not exite with Id : ${req.params.id}`))
//     }
//     if (blog.file === data.file) {
//         const response = await Blog.findByIdAndUpdate(req.params.id, data)
//         return res.status(200).json({
//             success: true,
//             response,
//             message: "Blog Updated Successfully !!"

//         })
//     }
//     else {
//         const oldImagePath = ('../uploads/', blog.file); // Proper path joining
//         console.log('Old image path:', oldImagePath);

//         try {
//             await fs.unlink(path.join(__dirname, `../uploads/${oldImagePath}`)); // Delete the old image
//             console.log('Old image deleted successfully:', oldImagePath);
//             const newUserData = {
//                 file: req.file ? path.basename(req.file.path) : blog.file,
//                 mainTitle: data.mainTitle,
//                 Descriptions: data.Descriptions,
//                 // ProductReviews: data.ProductReviews || [],
//                 IsActive: data.IsActive,
//             };
//             console.log(newUserData)
//             const response = await Blog.findByIdAndUpdate(req.params.id, newUserData, { new: true, runValidators: true, })
//             return res.status(200).json({
//                 success: true,
//                 response,
//                 message: "Blog Updated Successfully !!"
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





exports.updateBlog = catchAsyncError(async (req, res, next) => {
    const data = req.body;

    const blog = await Blog.findById(req.params.id);
    if (!blog) {
        return next(new ErrorHandler(`Blog does not exist with ID: ${req.params.id}`, 404));
    }

    const newUserData = {
        mainTitle: data.mainTitle,
        Descriptions: data.Descriptions,
        IsActive: data.IsActive,
    };

    if (req.files && req.files.file) {
        const imageId = blog.file?.public_id;
        if (imageId) {
            await cloudinary.v2.uploader.destroy(imageId);
        }
        const file = req.files.file;
        const originalName = path.parse(file.name).name;

        const sanitizedFileName = originalName.replace(/\s+/g, "_"); // spaces -> underscores

        const tempCompressedPath = path.join(
            os.tmpdir(),
            `compressed_${sanitizedFileName}.webp`
        );

        // ✅ Compress image using sharp (webp format)
        await sharp(file.tempFilePath)
            .resize({ width: 1200 })
            .webp({ quality: 60 })
            .toFile(tempCompressedPath);

        // ✅ Check file size (optional debug)
        const stats = fs.statSync(tempCompressedPath);
        const fileSizeInKB = Math.round(stats.size / 1024);
        console.log("✅ Compressed image size:", fileSizeInKB, "KB");
        // Delete old image


        const mycloud = await cloudinary.v2.uploader.upload(tempCompressedPath, {
            folder: "Blogs",
            public_id: sanitizedFileName,
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            resource_type: "image",
        });
        fs.unlinkSync(tempCompressedPath);


        newUserData.file = {
            public_id: mycloud.public_id,
            url: mycloud.secure_url,
        };
    }

    const response = await Blog.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
    });

    return res.status(200).json({
        success: true,
        response,
        message: "Blog Updated Successfully!!",
    });
});
