
const catchAsyncError = require("../../../Middlewares/catchAsyncError");
const MainBarSettings = require("../../../Models/ThemeSetting/MenuBarSettingModel");
const Menu = require("../../../Models/ThemeSetting/menuModel");

// ---------------- Menu CRUD ----------------

// Get all menus
exports.getMenus = catchAsyncError(async (req, res) => {
  const menus = await Menu.find().populate("parentMenu");
  res.json({ success: true, menus });
});

// Add new menu
exports.addMenu = catchAsyncError(async (req, res) => {
  const { title, type, parentMenu, link, order, status } = req.body;

  const cleanStatus = status?.trim().toLowerCase();

  const newMenu = new Menu({
    title,
    type,
    parentMenu: type === "sub" ? parentMenu : null,
    link,
    order,
    status: cleanStatus,
  });

  await newMenu.save();

  res.json({ success: true, message: "Menu added successfully", menu: newMenu });
});

// Delete menu
exports.deleteMenu = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  const menu = await Menu.findById(id);
  if (!menu) return res.status(404).json({ success: false, message: "Menu not found" });

  if (menu.type === "main") {
    await Menu.updateMany({ parentMenu: menu._id }, { $set: { parentMenu: null, type: "main" } });
  }

  await menu.deleteOne();
  res.json({ success: true, message: "Menu deleted successfully" });
});

// Update menu
exports.updateMenu = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  const { title, type, parentMenu, link, order, status } = req.body;
  const menu = await Menu.findById(id);
  if (!menu) return res.status(404).json({ success: false, message: "Menu not found" });
  menu.title = title || menu.title;
  menu.type = type || menu.type;
  menu.parentMenu = type === "sub" ? parentMenu : null;
  menu.link = link || menu.link;
  menu.order = order !== undefined ? order : menu.order;
  menu.status = status || menu.status;
  await menu.save();
  res.json({ success: true, message: "Menu updated successfully", menu });
});

// ---------------- MainBarSettings ----------------

// Get Main Bar Settings
exports.getMainBarSettings = catchAsyncError(async (req, res) => {
  let settings = await MainBarSettings.findOne();
  if (!settings) {
    settings = new MainBarSettings(); // default
    await settings.save();
  }
  res.json({ success: true, settings });
});

// Update Main Bar Settings
exports.updateMainBarSettings = catchAsyncError(async (req, res) => {
  const { backgroundColor, textColor, borderColor, status,icon,iconBgColor } = req.body;
  console.log("Received in backend:", req.body);  
  let settings = await MainBarSettings.findOne();
  if (!settings) {
    settings = new MainBarSettings({ backgroundColor, textColor, borderColor, status });
  } else {
    settings.backgroundColor = backgroundColor;
    settings.textColor = textColor;
    settings.borderColor = borderColor;
    settings.status = status;
    settings.icon=icon;
    settings.iconBgColor=iconBgColor;
  }
  await settings.save();
  res.json({ success: true, message: "Main Bar Settings updated", settings });
});
