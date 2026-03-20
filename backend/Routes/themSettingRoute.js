
// const express = require("express");

// const router = express.Router();
// const { isAuthenticateUser, authorizeRoles } = require("../Middlewares/auth");
// const { topBarSetting, getTopBarSetting, searchBarSetting, getSearchBarSetting } = require("../Controller/theme/Home/TopbarSetting");
// // const upload = require("../utils/multer");
// const multer = require("multer");
// const { getMenus, addMenu, getMainBarSettings, deleteMenu, updateMainBarSettings, updateMenu } = require("../Controller/theme/Home/MenuController");
// const { updateChildCategory } = require("../Controller/parentCategoryController");
// const path = require("path");
// const fs = require("fs");

// // Searchbar controller import karo
// const uploadPath = path.join(__dirname, "../uploads/searchbar");
// if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });
// // Topbar routes
// router.route("/theme/topbar").put(isAuthenticateUser, authorizeRoles("admin"), topBarSetting);
// router.route("/get-theme/topbar").get(getTopBarSetting);

// // Searchbar routes
// // router.route("/theme/searchbar").put(isAuthenticateUser, authorizeRoles("admin"), searchBarSetting);

// router.route("/theme/searchbar").post(
//   isAuthenticateUser,
//   authorizeRoles("admin"),
//   upload.single("file"),
//   searchBarSetting
// );

// router.route("/get-theme/searchbar").get(getSearchBarSetting);




// // Menu Routes
// router.get("/menu", getMenus);
// router.post("/menu/add", addMenu);
// router.delete("/menu-delete/:id", deleteMenu);
// router.put("/menu-update/:id", updateMenu);

// // MainBarSettings Routes
// router.get("/main-bar", getMainBarSettings);
// router.put("/main-bar/update", updateMainBarSettings);


// module.exports = router;





const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const {
  isAuthenticateUser,
  authorizeRoles,
} = require("../Middlewares/auth");

const {
  topBarSetting,
  getTopBarSetting,
  searchBarSetting,
  getSearchBarSetting,
} = require("../Controller/theme/Home/TopbarSetting");

const {
  getMenus,
  addMenu,
  getMainBarSettings,
  deleteMenu,
  updateMainBarSettings,
  updateMenu,
} = require("../Controller/theme/Home/MenuController");

const { updateChildCategory } = require("../Controller/parentCategoryController");

const router = express.Router();

/* 🔹 Ensure upload folder exists */
const uploadPath = path.join(__dirname, "../uploads/searchbar");
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

/* 🔹 Multer setup */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

/* ---------------- Topbar Routes ---------------- */
router
  .route("/theme/topbar")
  .put(isAuthenticateUser, authorizeRoles("admin"), topBarSetting);

router.route("/get-theme/topbar").get(getTopBarSetting);

/* ---------------- Searchbar Routes ---------------- */
// ✅ Use POST for file upload (important fix)
router.post(
  "/theme/searchbar",
  isAuthenticateUser,
  authorizeRoles("admin"),
  upload.single("file"),
  searchBarSetting
);

// ✅ Get route for retrieving data
router.get("/get-theme/searchbar", getSearchBarSetting);

/* ---------------- Menu Routes ---------------- */
router.get("/menu", getMenus);
router.post("/menu/add", addMenu);
router.delete("/menu-delete/:id", deleteMenu);
router.put("/menu-update/:id", updateMenu);

/* ---------------- Main Bar Settings ---------------- */
router.get("/main-bar", getMainBarSettings);
router.put("/main-bar/update", updateMainBarSettings);

module.exports = router;
