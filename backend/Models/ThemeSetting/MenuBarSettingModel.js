// models/MainBarSettings.js
const mongoose = require('mongoose');
const mainBarSettingsSchema = new mongoose.Schema(
  {
    backgroundColor: { type: String, default: "#ffffff" },
    textColor: { type: String, default: "#000000" },
    borderColor: { type: String, default: "#ced4da" },
    iconBgColor: { type: String},
    icon: { type: String, default:"fa-solid fa-list" },
  
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true }
);

const MainBarSettings = mongoose.model('MainBarSettings', mainBarSettingsSchema);
module.exports = MainBarSettings;