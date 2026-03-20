const mongoose = require("mongoose");

const taxSchema = new mongoose.Schema(
  {
    tax_name: {
      type: String,
      required: true,
      trim: true,
    },
    tax_rate: {
      type: Number,
      required: true,
      min: 0,
    },
    tax_type: {
      type: String,
      enum: ["inclusive", "exclusive"],
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      default: null,
    },
    IsActive: {
      type: String,
     
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tax", taxSchema);
