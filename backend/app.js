// const express = require("express");
// const app = express();
// const cors = require("cors");

// // CORS sabse pehle
// if (process.env.NODE_ENV !== "production") {
//   app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"]
//   }));
// } else {
//   app.use(cors({
//     origin: 'https://www.parijathandicraft.in',
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"]
//   }));
// }

// const errorMiddleware = require("./Middlewares/error");
// const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
// const fileUpload = require('express-fileupload');
// const path = require("path");

// // Baaki middlewares
// app.use(express.json());
// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(fileUpload({
//   useTempFiles: true,
//   tempFileDir: "/tmp/"
// }));

// const _dirname = path.resolve();
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Route Import



// const user = require("./Routes/userRoute");
// const category=require("./Routes/categoryRoute")
// const menufactures=require("./Routes/menufacturesRoute")
// const paymentMethod=require("./Routes/paymentsMethodRoute")
// const discount=require("./Routes/discoutRoute")
// const commonRoutes=require("./Routes/commonRoutes")
// const product=require("./Routes/productRoute")
// const order=require("./Routes/orderRoutes")
// const themSettingRoute=require("./Routes/themSettingRoute")

// app.use("/api/v1",themSettingRoute)

// app.use("/api/v1",user)
// app.use("/api/v1",category)
// app.use("/api/v1",menufactures)
// app.use("/api/v1",discount)
// app.use("/api/v1",paymentMethod)
// app.use("/api/v1",commonRoutes)
// app.use("/api/v1",product)
// app.use("/api/v1",order)

// // app.use(express.static(path.join(_dirname,"/frontend/dist")))
// // app.get("*",(req,res)=>{
// //   res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"))
// // })


// // Middleware for  Error

// app.use(errorMiddleware)



// module.exports=app



// =======================
// 🌐 Imports
// =======================
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const errorMiddleware = require("./Middlewares/error");

// =======================
// 🚀 App Initialization
// =======================
const app = express();
const __dirnameResolved = path.resolve();

// =======================
// 🔒 CORS Configuration
// =======================
const corsOptions = {
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  origin:
    process.env.NODE_ENV !== "production"
      ? "http://localhost:5173"
      : "https://www.parijathandicraft.in",
};
app.use(cors(corsOptions));

// =======================
// ⚙️ Core Middlewares
// =======================
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// =======================
// 📁 File Upload Middleware
// =======================
// 👉 express-fileupload mainly for quick uploads (if needed)
app.use((req, res, next) => {
  // ✅ Skip express-fileupload for multer-based routes
  if (
    req.url.startsWith("/api/v1/theme/searchbar") ||
    req.url.startsWith("/api/v1/theme/topbar")||
    req.url.startsWith("/api/v1/admin/add-home-banner")||
    req.url.startsWith("/api/v1/admin/update-home-banner")||
    req.url.startsWith("/api/v1/admin/add-parent-category")||
    req.url.startsWith("/api/v1/admin/update-parent-category")||
    req.url.startsWith("/api/v1/admin/add-child-category")||
    req.url.startsWith("/api/v1/admin/update-child-category")||
    req.url.startsWith("/api/v1/admin/add-hot-deal-banner")||
    req.url.startsWith("/api/v1/admin/update-hot-deal-banner")||
    req.url.startsWith("/api/v1/admin/add-compaingns")||
    req.url.startsWith("/api/v1/admin/update-compaingns")||
    req.url.startsWith("/api/v1/admin/add-product-data")||
    req.url.startsWith("/api/v1/admin/update-product-data")||
    req.url.startsWith("/api/v1/admin/add-blog")||
    req.url.startsWith("/api/v1/admin/bulk-upload-excel")

  ) {
    return next();
  }
  fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" })(req, res, next);
});

// =======================
// 🖼️ Static Uploads Folder
// =======================
app.use("/uploads", express.static(path.join(__dirnameResolved, "uploads")));

// =======================
// 📦 Route Imports
// =======================
const userRoute = require("./Routes/userRoute");
const categoryRoute = require("./Routes/categoryRoute");
const manufacturerRoute = require("./Routes/menufacturesRoute");
const paymentMethodRoute = require("./Routes/paymentsMethodRoute");
const discountRoute = require("./Routes/discoutRoute");
const commonRoutes = require("./Routes/commonRoutes");
const productRoute = require("./Routes/productRoute");
const orderRoute = require("./Routes/orderRoutes");
const themeSettingRoute = require("./Routes/themSettingRoute");

// =======================
// 🚏 API Routes
// =======================
app.use("/api/v1", themeSettingRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", categoryRoute);
app.use("/api/v1", manufacturerRoute);
app.use("/api/v1", discountRoute);
app.use("/api/v1", paymentMethodRoute);
app.use("/api/v1", commonRoutes);
app.use("/api/v1", productRoute);
app.use("/api/v1", orderRoute);

// =======================
// 🌐 Frontend Deployment (optional build serve)
// =======================
// Uncomment when you deploy with frontend
// app.use(express.static(path.join(__dirnameResolved, "frontend/dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirnameResolved, "frontend", "dist", "index.html"));
// });

// =======================
// ❌ Global Error Handler
// =======================
app.use(errorMiddleware);

// =======================
// ✅ Export App
// =======================
module.exports = app;
