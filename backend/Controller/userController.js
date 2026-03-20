const ErrorHandler = require("../utils/errorhandler");

const User = require("../Models/userModel");
const catchAsyncError = require("../Middlewares/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto")
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const os = require("os");
const sharp = require("sharp");
const cloudinary = require("cloudinary");


const Contact = require("../Models/contactModel");
const Subscriders = require("../Models/subscribersModel");


exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, lname, email, password } = req.body;

    console.log("Received Email:", email);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return next(new ErrorHandler("User already exists with this email", 400));
    }

    const user = await User.create({
        email,
        name,
        lname,
        password,
    });

    if (!user) {
        return next(new ErrorHandler("User Not Created", 400));
    }

    sendToken(user, 200, res);
});




exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return next(new ErrorHandler("Please enter both email and password", 400));
    }

    // Search for the user by email
    const user = await User.findOne({ email }).select("+password");

    // If no user found with the provided email
    if (!user) {
        return res.status(404).json({
            message: "User not found",
            success: false
        });
    }

    // Compare the entered password with the stored hashed password
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    // If everything matches, send the token and success response
    sendToken(user, 200, res);
});






exports.logout = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: true,
        sameSite: "None",
    });

    res.status(200).json({
        success: true,
        message: "Logged Out Successfully",
    });
});

// Forget Password
exports.forgetPassword = catchAsyncError(async (req, res, next) => {
    console.log(req.body.email)
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("User Not Found", 404));
    }

    // Get Reset Password Token from the user model
    const resetToken = user.getResetPasswordToken();

    // Save user with the new reset token and expire date (handles in getResetPasswordToken method)
    await user.save({ validateBeforeSave: false });

    // Construct reset password URL
    const resetPasswordUrl = `${req.protocol}://localhost:5173/password/reset/${resetToken}`;
    // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is as follows:\n\n${resetPasswordUrl}\n\nIf you did not request this email, please ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Parijat Handicraft',
            message
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        });

    } catch (error) {
        // Clear the reset token and expiry on error to avoid misuse
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        // Save the reset token changes
        await user.save({ validateBeforeSave: false });

        // Propagate the error with a custom message
        return next(new ErrorHandler('Error sending email, please try again later.', 500));
    }
});


exports.resetPassword = catchAsyncError(async (req, res, next) => {
    // Assuming `resetToken` is coming from the request URL or body
    const resetToken = req.params.token || req.body.token;
    console.log(resetToken)

    // Creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    // Find user by the reset token and check if token has not expired
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        return next(new ErrorHandler("Reset Password token is invalid or has expired", 400));
    }

    if (req.body.password !== req.body.cpassword) {
        return next(new ErrorHandler("Password does not match", 400));
    }

    // Assuming you are hashing password in the user model pre-save middleware
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save(); // Saving the updated user, which should handle password hashing

    // Sending a new token after successful password reset
    sendToken(user, 200, res);
});

// Get User Detail
exports.getUserDetails = catchAsyncError(
    async (req, res, next) => {

        const user = await User.findById(req.user.id).populate("address");

        res.status(200).json({
            success: true,
            user: user
        })
    }
)

//Update USer password

exports.updatePassword = catchAsyncError(async (req, res, next) => {
  console.log("Request Body fghgfh g:", req.body);

  const user = await User.findById(req.params.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 401));
  }

  user.password = req.body.password;
  await user.save();

  // sendToken user ko new JWT ke sath bhejta hai
  sendToken(user, 200, res);
});


// exports.updatePassword = catchAsyncError(async (req, res, next) => {
//   console.log("Request Body:", req.body); // 👈 Ye check kar
//   const user = await User.findById(req.params.id).select("+password");

//   const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
//   if (!isPasswordMatched) {
//     return next(new ErrorHandler("Old password is incorrect", 401));
//   }

//   user.password = req.body.password;
//   await user.save();

//   sendToken(user, 200, res);
// });


// 🌿🌿🌿

exports.updateProfile = catchAsyncError(async (req, res, next) => {
    // console.log('Request body:', req.body);
    // console.log('Uploaded file:', req.file);

    const user = await User.findById(req.user.id);
    if (!user) {
        console.log('User not found:', req.user.id);
        return next(new ErrorHandler('User not found', 404));
    } else {
        // console.log("User found:", user);
    }

    const newUserData = {
        name: req.body.name,
        lname: req.body.lname,
        email: req.body.email,
        phone: req.body.phone,
        CityName: req.body.CityName,
        StateName: req.body.StateName,
        address: req.body.address,
        shippingAddress: req.body.shippingAddress,
        PostalCode: req.body.PostalCode,
        CountryName: req.body.CountryName,
        // file: req.file ? path.basename(req.file.path) : user.file,
    };


    if (req.files && req.files.file) {
        const imageId = user.file?.public_id;
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
            folder: "UserProfile",
            public_id: sanitizedFileName,
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            resource_type: "image",
        });


        newUserData.file = {
            public_id: mycloud.public_id,
            url: mycloud.secure_url,
        };
        fs.unlinkSync(tempCompressedPath);
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, newUserData, { new: true, runValidators: true, });

    if (!updatedUser) {
        console.log('Failed to update user:', req.user.id);
        return next(new ErrorHandler('User update failed', 500));
    }

    res.status(200).json({
        user: updatedUser,
        success: true,
    });
});


// //Get All users(admin)
exports.getAllUser = catchAsyncError(
    async (req, res, next) => {
        const userCount = await User.countDocuments();


        const users = await User.find()
        res.status(200).json({
            success: true,
            users,
            userCount
        })

    }
)

// //Get single user(admin)
exports.getSingleUser = catchAsyncError(
    async (req, res, next) => {

        const user = await User.findById(req.params.id);

        if (!user) {
            return next(new ErrorHandler(`User does not exist with Id : ${req.params.id}`))
        }
        res.status(200).json({
            success: true,
            user,
        })

    }
)


//Update USer Role ---Admin
exports.updateUserRole = catchAsyncError(
    async (req, res, next) => {
        const newUserData = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role
        };



        const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: true,
        })

        res.status(200).json({
            success: true,
        });

    }
)

//Delete USer ---Admin
exports.deleteUser = catchAsyncError(
    async (req, res, next) => {


        const user = await User.findById(req.params.id);
        if (!user) {
            return next(new ErrorHandler(`User does not exite with Id : ${req.params.id}`))
        }
        // if (user.file) { // Check if there's an old image to delete
        //     const oldImagePath = ('../uploads/', user.file); // Proper path joining
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

        const imageId = user.file?.public_id;
        if (imageId) {
            await cloudinary.v2.uploader.destroy(imageId);
        }
        await user.deleteOne();

        res.status(200).json({
            success: true,
            message: "User deleted Successfully"
        });

    }
)


exports.adminAddUser = catchAsyncError(async (req, res, next) => {
    const data = req.body.addUser;
    const { CountryName, StateName, CityName, PostalCode, password, cpassword, name, lname, mname, role, userType, DOB, IsActive, IsVerified, phone, mobileNo, gender, address, address1 } = req.body;
    const file = req.file ? req.file.filename : null;
    const email = req.body.email;

    console.log("Data:", data);
    console.log("Email:", email);

    // Convert isActive and isverify to booleans
    const isActiveBoolean = IsActive === 'on' ? true : false;
    const isVerifiedBoolean = IsVerified === 'on' ? true : false;

    // Hash password before inserting
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        console.log("Received data:", {
            email,
            CountryName,
            StateName,
            CityName,
            PostalCode,
            password: hashedPassword,
            file
        });

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

        const stats = fs.statSync(tempCompressedPath);
        const fileSizeInKB = Math.round(stats.size / 1024);
        console.log("✅ Compressed image size:", fileSizeInKB, "KB")

        const mycloud = await cloudinary.v2.uploader.upload(tempCompressedPath, {
            folder: "UserProfile",
            public_id: sanitizedFileName,
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            resource_type: "image",
        });
        fs.unlinkSync(tempCompressedPath);

        // Create the user in the database with explicit fields
        const response = await User.create({
            name, lname, mname, cpassword, phone,
            email,
            password: hashedPassword,  // Ensure hashed password is used
            file: {
                public_id: mycloud.public_id,
                url: mycloud.secure_url,
            },
            CityName: CityName || "Noida",  // Use provided values or defaults
            CountryName: CountryName || "IN",
            PostalCode: PostalCode,
            StateName: StateName || "UP",
            mobileNo: mobileNo,
            IsActive: isActiveBoolean,  // Use the boolean value
            IsVerified: isVerifiedBoolean,  // Use the boolean value
            role,
            userType,
            gender,

            DOB: DOB,
            address, address1,
            createdAt: new Date(),
        });

        if (!response) {
            return next(new ErrorHandler("User Not Inserted", 400));
        }

        res.status(200).json({
            success: true,
            message: "User Added Successfully !!",
            response
        });

    } catch (error) {
        console.error("Error:", error);
        return next(new ErrorHandler(error, 500));
    }
});


exports.updateUserDetails = catchAsyncError(async (req, res, next) => {
    console.log('Request body:', req.body);
    console.log('Uploaded file:', req.file);

    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }

    console.log("User kya find kiya yrr", user)
    console.log("Id kya find kiya yrr", req.params.id)

    const isActiveBoolean = req.body.IsActive === 'on' ? true : false;
    const isVerifiedBoolean = req.body.IsVerified === 'on' ? true : false;

    const newUserData = {
        name: req.body.name,
        lname: req.body.lname,
        email: req.body.email,
        phone: req.body.phone,
        CityName: req.body.CityName,
        StateName: req.body.StateName,

        address: req.body.address,
        shippingAddress: req.body.shippingAddress,
        PostalCode: req.body.PostalCode,
        CountryName: req.body.CountryName,
        // file: req.file ? path.basename(req.file.path) : user.file,
        IsActive: isActiveBoolean,
        IsVerified: isVerifiedBoolean,
        gender: req.body.gender,
        userType: req.body.userType,
        role: req.body.role,
    };

    console.log("New Data kya hai", newUserData)

    // // File deletion logic
    // if (user.file === req.body.file) {
    //     const response = await User.findByIdAndUpdate(req.params.id, newUserData)
    //     return res.status(200).json({
    //         success: true,
    //         response,
    //         message: "User Updated Successfully !!"

    //     })
    // }
    // else {
    //     const oldImagePath = ('../uploads/', user.file); // Proper path joining
    //     console.log('Old image path:', oldImagePath);

    //     try {
    //         await fs.unlink(path.join(__dirname, `../uploads/${oldImagePath}`)); // Delete the old image
    //         console.log('Old image deleted successfully:', oldImagePath);
    //         const newUserData = {
    //             name: req.body.name,
    //             lname: req.body.lname,
    //             email: req.body.email,
    //             phone: req.body.phone,
    //             CityName: req.body.CityName,
    //             StateName: req.body.StateName,
    //             address: req.body.address,
    //             shippingAddress: req.body.shippingAddress,
    //             PostalCode: req.body.PostalCode,
    //             CountryName: req.body.CountryName,
    //             file: req.file ? path.basename(req.file.path) : user.file,
    //             IsActive: isActiveBoolean,
    //             IsVerified: isVerifiedBoolean,
    //             gender: req.body.gender


    //         };
    //         console.log(newUserData)
    //         const response = await User.findByIdAndUpdate(req.params.id, newUserData, { new: true, runValidators: true, })
    //         return res.status(200).json({
    //             success: true,
    //             response,
    //             message: "User Updated Successfully !!"
    //         })
    //     } catch (err) {
    //         if (err.code === 'ENOENT') {
    //             console.log('Old image does not exist, skipping deletion:', oldImagePath);
    //         } else {
    //             console.error('Error deleting old image:', err);
    //             return next(new ErrorHandler('Error deleting old image', 500));
    //         }
    //     }
    // }

    if (req.files && req.files.file) {
        const imageId = user.file?.public_id;
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
            folder: "UserProfile",
            public_id: sanitizedFileName,
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            resource_type: "image",
        });


        newUserData.file = {
            public_id: mycloud.public_id,
            url: mycloud.secure_url,
        };
        fs.unlinkSync(tempCompressedPath);
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, newUserData, { new: true, runValidators: true });
        res.status(200).json({ user: updatedUser, success: true });
    } catch (error) {
        console.error('Validation error:', error);
        return next(new ErrorHandler('Validation Error', 400));
    }

});



exports.updateUserData = catchAsyncError(async (req, res, next) => {

    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Phone:", phone);

    const user = await User.findById(req.params.id);
    console.log(user)
    if (!user) {
        return next(new ErrorHandler(`User does not exite with Id : ${req.params.id}`))
    }

    const newUserData = {
        name: name,
        email: email,
        phone: phone
    };
    console.log(newUserData)
    const response = await User.findByIdAndUpdate(req.params.id, newUserData, { new: true, runValidators: true, })
    return res.status(200).json({
        success: true,
        response,
        message: "User Details Updated Successfully !!"
    })

})


// ================================= Contact ===============================

exports.sendContactDetails = catchAsyncError(async (req, res, next) => {
    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone
    const subject = req.body.subject
    const message = req.body.message

    if (!email || !phone) {
        return res.status(400).json({
            success: false,
            message: "Email or Phone Required "
        })
    }
    const contact = await Contact.create({ name, email, phone, subject, message })

    if (!contact) {
        return next(new ErrorHandler("User Not Found", 400));

    }
    res.status(200).json({
        success: true,
        message: "Message Send Successfully."
    })

})

exports.getAllContact = catchAsyncError(async (req, res, next) => {

    const contactionList = await Contact.find()
    if (!contactionList) {
        return next(ErrorHandler(" contact Not Found", 400))
    }
    res.status(200).json({
        success: true,
        contactionList
    })

})

exports.deleteContact = catchAsyncError(async (req, res, next) => {
    const id = req.body
    console.log(id)
    const contact = await Contact.findById(req.params.id);
    console.log(contact)

    await contact.deleteOne();

    res.status(200).json({
        success: true,
        message: "Contact deleted Successfully"
    });

})


// ================================== Subcribers ===============================

exports.sendSubscribersDetails = catchAsyncError(async (req, res, next) => {
    const email = req.body.email


    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Email Required "
        })
    }

    const checkemail = await Subscriders.findOne({ email })

    if (checkemail) {
        return res.status(400).json({
            success: false,
            message: "Already Subscribe !!"
        })
    }
    const subscriber = await Subscriders.create({ email })

    if (!subscriber) {
        return next(new ErrorHandler("User Not Found", 400));

    }
    res.status(200).json({
        success: true,
        message: "Message Send Successfully."
    })

})

exports.getAllSubscribers = catchAsyncError(async (req, res, next) => {

    const subscribersList = await Subscriders.find()
    if (!subscribersList) {
        return next(ErrorHandler(" contact Not Found", 400))
    }
    res.status(200).json({
        success: true,
        subscribersList
    })

})

exports.deleteSubscribers = catchAsyncError(async (req, res, next) => {
    const id = req.body
    console.log(id)
    const subscribers = await Subscriders.findById(req.params.id);
    console.log(subscribers)

    await subscribers.deleteOne();

    res.status(200).json({
        success: true,
        message: "Subscriber deleted Successfully"
    });

})


// Address Add 
const Address = require('../Models/addressModel');

// ✅ Create address
// exports.addAddress = async (req, res) => {
//     try {
//         const { firstName, lastName, addressLine1, city, state, zipCode, phone, isDefault } = req.body;
//         console.log("Address Body:", req.body);
//         const userId = req.user.id; // from auth middleware
        
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         // If setting this address as default, unset previous defaults

//         if (req.body.isDefault) {
//             await Address.updateMany({ user: userId }, { isDefault: false });
//         }


//         const addressline = await Address.create({
//             ...req.body,
//             user: userId,
//         });

//         user.address.push(addressline._id);
//         await user.save();

//         res.status(201).json({
//             success: true,
//             message: "Address added successfully",
//             addressline,
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };


exports.addAddress = async (req, res) => {
  try {
    const { firstName, lastName, addressLine1, city, state, zipCode, phone, isDefault } = req.body;
    console.log("Address Body:", req.body);

    const userId = req.user.id; // from auth middleware
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Unset old defaults if new one is default
    if (isDefault) {
      await Address.updateMany({ user: userId }, { isDefault: false });
    }

    const addressline = await Address.create({
      ...req.body,
      user: userId,
    });

    // ✅ safer way to update
    await User.findByIdAndUpdate(
      userId,
      { $push: { address: addressline._id } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Address added successfully",
      addressline,
    });
  } catch (error) {
    console.error("Add address error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get all addresses of user
exports.getMyAddresses = async (req, res) => {
    try {
        const addresses = await Address.find({ user: req.user.id });
        res.json({ success: true, addresses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Set default address
exports.setDefaultAddress = async (req, res) => {
    try {
        const {addressId} = req.body;
        const userId = req.user;
        console.log("Setting default address ID:", addressId);

        await Address.updateMany({ user: userId }, { isDefault: false });
        await Address.findByIdAndUpdate(addressId, { isDefault: true });

        res.json({ success: true, message: "Default address updated" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
