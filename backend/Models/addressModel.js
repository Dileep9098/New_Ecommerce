// const mongoose = require('mongoose');

// const addressSchema = new mongoose.Schema(
//   {
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     addressLine1: { type: String, required: true },
//     addressLine2: { type: String },
//     city: { type: String, required: true },
//     country: { type: String, required: true, default: 'India' },
//     state: { type: String, required: true,  },
//     zipCode: { type: String, required: true },
//     businessName: { type: String },
//     isDefault: { type: Boolean, default: false },
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } 
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model('Address', addressSchema);



const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: String,
    city: { type: String, required: true },
    phone: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true, default: "India" },
    businessName: String,
    isDefault: { type: Boolean, default: false },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);
