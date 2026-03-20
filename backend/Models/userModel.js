


const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [3, "Name cannot be less than 3 characters"]
    },
    mname: {
        type: String,
    },
    lname: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        validate: [validator.isEmail, "Please Enter a valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [4, "Password should be at least 4 characters long"],
        select: false,
    },
    cpassword: {
        type: String,
        minLength: [4, "Password should be at least 4 characters long"],
        select: false,
    },
    userType: {
        type: String,
        default: "customer"
    },
    role: {
        type: String,
        default: "user"
    },
    phone: {
        type: String,
    },
    mobileNo: {
        type: String,
    },
    DOB: {
        type: Date,
    },
    gender: {
        type: String
    },
    file: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },

    },
    IsActive: {
        type: Boolean,
        default: true
    },
    IsVerified: {
        type: Boolean,
        default: false
    },
    CityName: {
        type: String,
    },
    CountryName: {
        type: String,
    },
    PostalCode: {
        type: String,
    },
    StateName: {
        type: String,
    },
    // address: {
    //     type: String,
    // },
    address: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    }],
    address1: {
        type: String,
    },
    shippingAddress: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

// Check for duplicate email before saving
// userSchema.pre("save", async function (next) {
//     const userExists = await mongoose.model("User").findOne({ email: this.email });
//     if (userExists) {
//         return next(new Error("Email already exists. Please use a different email."));
//     }
//     next();
// });


userSchema.pre("save", async function (next) {
    // ✅ Run this only when email is modified
    if (this.isModified("email")) {
        const userExists = await mongoose.model("User").findOne({ email: this.email });
        if (userExists && userExists._id.toString() !== this._id.toString()) {
            return next(new Error("Email already exists. Please use a different email."));
        }
    }
    next();
});


// Password hashing
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// JWT Token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generate Reset Password Token
userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hash the token and add it to the user schema
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
};

module.exports = mongoose.model("User", userSchema);
