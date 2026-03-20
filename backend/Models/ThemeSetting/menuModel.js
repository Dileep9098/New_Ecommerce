// // models/Menu.js

// const mongoose = require('mongoose');

// const menuSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true, trim: true },
//     type: { type: String, enum: ["main", "sub"], default: "main" },
//     parentMenu: { type: mongoose.Schema.Types.ObjectId, ref: "Menu", default: null },
//     link: { type: String, default: "#" },
//     order: { type: Number, default: 0 },
//     status: { type: String, enum: ["active", "in-active"], default: "active" },
//   },
//   { timestamps: true }
// );

// const Menu = mongoose.model('Menu', menuSchema);
// module.exports = Menu;



const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, enum: ["main", "sub"], default: "main" },
    parentMenu: { type: mongoose.Schema.Types.ObjectId, ref: "Menu", default: null },
    link: { type: String, default: "#" },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ["active", "in-active"], default: "active" },
  },
  { timestamps: true }
);

// ✅ Prevent Overwrite Error
module.exports = mongoose.models.Menu || mongoose.model("Menu", menuSchema);
