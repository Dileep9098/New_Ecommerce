


const path = require('path');
const fs = require('fs');
const catchAsyncError = require("../Middlewares/catchAsyncError");
const Product = require("../Models/productModel");
const ChildCategory = require("../Models/childCategoryModel");
const ErrorHandler = require("../utils/errorhandler");
const mongoose = require("mongoose");
const ApiFeatures = require('../utils/apifeatures');
const ProductReview = require('../Models/productReviewModel');
const bfs = require("fs");
const csvParser = require("csv-parser");
// const Product = require("../Models/productModel");
const xlsx = require("xlsx");
const os = require("os");
const sharp = require("sharp");
const cloudinary = require("cloudinary");

// exports.addProduct = catchAsyncError(async (req, res, next) => {
//     try {
//         const data = req.body
//         console.log("data", data)
//         //     const category=data.ProductsCategoriesMappings
//         //   console.log(category) 
//         const images = req.files.map(file => path.basename(file.path));

//         let formattedCategories = [];

//         if (Array.isArray(data.ProductsCategoriesMappings)) {
//             formattedCategories = data.ProductsCategoriesMappings.map(categoryId => new mongoose.Types.ObjectId(categoryId));
//         } else {
//             console.error('ProductsCategoriesMappings is not an array', data.ProductsCategoriesMappings);
//         }


//         // Create a new product object
//         const newProduct = new Product({
//             ProductName: data.ProductName || '',
//             ProductWeight: data.ProductWeight || '',
//             ProductColor: data.ProductColor || '',
//             ProductSize: data.ProductSize || '',
//             Price: data.Price || 0,
//             ShippingCharge: data.ShippingCharge || 0,
//             AttachmentURL: data.AttachmentURL || '',
//             // IsDiscountCreatePageSearchEnabled: data.IsDiscountCreatePageSearchEnabled || false,
//             Rating: data.Rating || 0,
//             TotalReviews: data.TotalReviews || '0',
//             ShortDescription: data.ShortDescription || '',
//             FullDescription: data.FullDescription || '',
//             VendorId: data.VendorId || '',
//             Menufacturs: data.Menufacturs || null,
//             MetaTitle: data.MetaTitle || '',
//             MetaKeywords: data.MetaKeywords || '',
//             MetaDescription: data.MetaDescription || '',
//             OldPrice: data.OldPrice || null,
//             // IsTaxExempt: data.IsTaxExempt || false,
//             IsShippingFree: data.IsShippingFree || false,
//             EstimatedShippingDays: data.EstimatedShippingDays || 0,
//             ShowOnHomePage: data.ShowOnHomePage || false,
//             AllowCustomerReviews: data.AllowCustomerReviews || false,
//             IsReturnAble: data.IsReturnAble || false,
//             IsDigitalProduct: data.IsDigitalProduct || false,
//             IsDiscountAllowed: data.IsDiscountAllowed || false,
//             Sku: data.Sku || '',
//             WarehouseId: data.WarehouseId || '',
//             InventoryMethodId: data.InventoryMethodId || '',
//             StockQuantity: data.StockQuantity || 0,
//             IsBoundToStockQuantity: data.IsBoundToStockQuantity || false,
//             DisplayStockQuantity: data.DisplayStockQuantity || false,
//             OrderMinimumQuantity: data.OrderMinimumQuantity || 1,
//             OrderMaximumQuantity: data.OrderMaximumQuantity || 100,
//             MarkAsNew: data.MarkAsNew || false,
//             DisplaySeqNo: data.DisplaySeqNo || 0,
//             IsActive: data.IsActive || true,
//             DiscountProductsMappings: data.DiscountProductsMappings || "",
//             OrderItems: data.OrderItems || [],
//             // ProductDigitalFileMappings: data.ProductDigitalFileMappings || [],
//             ProductPictures: images || [],
//             ProductReviews: data.ProductReviews || [],
//             ProductsCategoriesMappings:formattedCategories,
//             ProductShippingMethodsMappings: data.ProductShippingMethodsMappings || '',
//             ProductsTag: data.ProductsTag || [],
//             AvailableStartDate: data.AvailableStartDate || '',
//             AvailableEndDate: data.AvailableEndDate || '',
//         });

//         // Save the product
//         const savedProduct = await newProduct.save();

//         res.status(201).json({
//             success: true,
//             product: savedProduct,
//             message: "Product added successfully"
//         });
//     } catch (error) {
//         console.error("Error in adding product:", error);
//         next(error); // Pass error to error handler
//     }
// });


// exports.addProduct = catchAsyncError(async (req, res, next) => {
//     try {
//         const data = req.body;
//         console.log("data", data);

//         const images = req.files.map(file => path.basename(file.path));

//         let formattedCategories = [];
//         if (Array.isArray(data.ProductsCategoriesMappings)) {
//             formattedCategories = data.ProductsCategoriesMappings
//                 .filter(id => mongoose.Types.ObjectId.isValid(id))
//                 .map(categoryId => new mongoose.Types.ObjectId(categoryId));
//         } else {
//             console.error('ProductsCategoriesMappings is not an array', data.ProductsCategoriesMappings);
//         }

//         // ✅ Validate `DiscountProductsMappings` (Remove empty strings)
//         let discountMappings = [];
//         if (Array.isArray(data.DiscountProductsMappings)) {
//             discountMappings = data.DiscountProductsMappings
//                 .filter(id => mongoose.Types.ObjectId.isValid(id) && id.trim() !== "")
//                 .map(id => new mongoose.Types.ObjectId(id));
//         }

//         // ✅ Validate `ProductSize` (Remove empty string)
//         let productSize = null;
//         if (data.ProductSize && mongoose.Types.ObjectId.isValid(data.ProductSize) && data.ProductSize.trim() !== "") {
//             productSize = new mongoose.Types.ObjectId(data.ProductSize);
//         }
//         else{

//         }
//         let Tax = null;
//         if (data.Tax && mongoose.Types.ObjectId.isValid(data.Tax) && data.Tax.trim() !== "") {
//             Tax = new mongoose.Types.ObjectId(data.Tax);
//         }

//         // Create a new product object
//         const newProduct = new Product({
//             ProductName: data.ProductName || '',
//             ProductWeight: data.ProductWeight || '',
//             ProductColor: data.ProductColor || '',
//             Price: data.Price || 0,
//             ShippingCharge: data.ShippingCharge || 0,
//             AttachmentURL: data.AttachmentURL || '',
//             Rating: data.Rating || 0,
//             TotalReviews: data.TotalReviews || '0',
//             ShortDescription: data.ShortDescription || '',
//             FullDescription: data.FullDescription || '',
//             VendorId: data.VendorId || '',
//             Menufacturs: data.Menufacturs || null,
//             MetaTitle: data.MetaTitle || '',
//             MetaKeywords: data.MetaKeywords || '',
//             MetaDescription: data.MetaDescription || '',
//             OldPrice: data.OldPrice || null,
//             IsShippingFree: data.IsShippingFree || false,
//             EstimatedShippingDays: data.EstimatedShippingDays || 0,
//             ShowOnHomePage: data.ShowOnHomePage || false,
//             AllowCustomerReviews: data.AllowCustomerReviews || false,
//             IsReturnAble: data.IsReturnAble || false,
//             IsDigitalProduct: data.IsDigitalProduct || false,
//             IsDiscountAllowed: data.IsDiscountAllowed || false,
//             Sku: data.Sku || '',
//             WarehouseId: data.WarehouseId || '',
//             InventoryMethodId: data.InventoryMethodId || '',
//             StockQuantity: data.StockQuantity || 0,
//             IsBoundToStockQuantity: data.IsBoundToStockQuantity || false,
//             DisplayStockQuantity: data.DisplayStockQuantity || false,
//             OrderMinimumQuantity: data.OrderMinimumQuantity || 1,
//             OrderMaximumQuantity: data.OrderMaximumQuantity || 100,
//             MarkAsNew: data.MarkAsNew || false,
//             DisplaySeqNo: data.DisplaySeqNo || 0,
//             IsActive: data.IsActive || true,
//             DiscountProductsMappings: discountMappings.length > 0 ? discountMappings : undefined, // ✅ Empty array store nahi hoga
//             ProductSize: productSize || undefined,
//             Tax: Tax || undefined,
//             OrderItems: data.OrderItems || [],
//             ProductPictures: images || [],
//             ProductReviews: data.ProductReviews || [],
//             ProductsCategoriesMappings: formattedCategories,
//             ProductShippingMethodsMappings: data.ProductShippingMethodsMappings || '',
//             ProductsTag: data.ProductsTag || [],
//             AvailableStartDate: data.AvailableStartDate || '',
//             AvailableEndDate: data.AvailableEndDate || '',
//             CustomProductSize: data.CustomProductSize || '',
//         });

//         // Save the product
//         const savedProduct = await newProduct.save();

//         res.status(201).json({
//             success: true,
//             product: savedProduct,
//             message: "Product added successfully"
//         });
//     } catch (error) {
//         console.error("Error in adding product:", error);
//         next(error);
//     }
// });



// exports.addProduct = catchAsyncError(async (req, res, next) => {
//   try {
//     const data = req.body;
//     console.log("data", data);

//     const files = req.files || [];
//     const ProductPictures = [];

//       console.log("🟢 Uploaded Files:", files.map(f => f.filename));

//    for (const file of files) {
//   const originalName = path.parse(file.originalname).name;
//   const sanitizedFileName = originalName.replace(/\s+/g, "_");

//   const compressedPath = path.join(
//     __dirname,
//     "../uploads/",
//     `compressed_${sanitizedFileName}_${Date.now()}.webp`
//   );

//   await sharp(file.path)
//     .resize({ width: 1200 })
//     .webp({ quality: 60 })
//     .toFile(compressedPath);

//   fs.unlinkSync(file.path);

//   // Ab hum sirf relative path push karenge as string
//   // Backend se serve karne ke liye /uploads/ prefix lagana
//   const relativePath = `${path.basename(compressedPath)}`;
//   ProductPictures.push(relativePath);
// }

//     let formattedCategories = [];
//     if (Array.isArray(data.ProductsCategoriesMappings)) {
//       formattedCategories = data.ProductsCategoriesMappings
//         .filter((id) => mongoose.Types.ObjectId.isValid(id))
//         .map((id) => new mongoose.Types.ObjectId(id));
//     }

//     let discountMappings = [];
//     if (Array.isArray(data.DiscountProductsMappings)) {
//       discountMappings = data.DiscountProductsMappings
//         .filter((id) => mongoose.Types.ObjectId.isValid(id) && id.trim() !== "")
//         .map((id) => new mongoose.Types.ObjectId(id));
//     }

//     let productSize = null;
//     if (data.ProductSize && mongoose.Types.ObjectId.isValid(data.ProductSize) && data.ProductSize.trim() !== "") {
//       productSize = new mongoose.Types.ObjectId(data.ProductSize);
//     }

//     let Tax = null;
//     if (data.Tax && mongoose.Types.ObjectId.isValid(data.Tax) && data.Tax.trim() !== "") {
//       Tax = new mongoose.Types.ObjectId(data.Tax);
//     }

//     const newProduct = new Product({
//       ProductName: data.ProductName || '',
//       ProductWeight: data.ProductWeight || '',
//       ProductColor: data.ProductColor || '',
//       Price: data.Price || 0,
//       ShippingCharge: data.ShippingCharge || 0,
//       AttachmentURL: data.AttachmentURL || '',
//       Rating: data.Rating || 0,
//       TotalReviews: data.TotalReviews || '0',
//       ShortDescription: data.ShortDescription || '',
//       FullDescription: data.FullDescription || '',
//       VendorId: data.VendorId || '',
//       Menufacturs: data.Menufacturs || null,
//       MetaTitle: data.MetaTitle || '',
//       MetaKeywords: data.MetaKeywords || '',
//       MetaDescription: data.MetaDescription || '',
//       OldPrice: data.OldPrice || null,
//       IsShippingFree: data.IsShippingFree || false,
//       EstimatedShippingDays: data.EstimatedShippingDays || 0,
//       ShowOnHomePage: data.ShowOnHomePage || false,
//       AllowCustomerReviews: data.AllowCustomerReviews || false,
//       IsReturnAble: data.IsReturnAble || false,
//       IsDigitalProduct: data.IsDigitalProduct || false,
//       IsDiscountAllowed: data.IsDiscountAllowed || false,
//       Sku: data.Sku || '',
//       WarehouseId: data.WarehouseId || '',
//       InventoryMethodId: data.InventoryMethodId || '',
//       StockQuantity: data.StockQuantity || 0,
//       IsBoundToStockQuantity: data.IsBoundToStockQuantity || false,
//       DisplayStockQuantity: data.DisplayStockQuantity || false,
//       OrderMinimumQuantity: data.OrderMinimumQuantity || 1,
//       OrderMaximumQuantity: data.OrderMaximumQuantity || 100,
//       MarkAsNew: data.MarkAsNew || false,
//       DisplaySeqNo: data.DisplaySeqNo || 0,
//       IsActive: data.IsActive !== "false", // boolean handling
//       DiscountProductsMappings: discountMappings.length > 0 ? discountMappings : undefined,
//       ProductSize: productSize || undefined,
//       Tax: Tax || undefined,
//       InternationCharge: data.InternationCharge || "",
//       OrderItems: data.OrderItems || [],
//       ProductPictures,
//       ProductReviews: data.ProductReviews || [],
//       ProductsCategoriesMappings: formattedCategories,
//       ProductShippingMethodsMappings: data.ProductShippingMethodsMappings || '',
//       ProductsTag: data.ProductsTag || [],
//       AvailableStartDate: data.AvailableStartDate || '',
//       AvailableEndDate: data.AvailableEndDate || '',
//       CustomProductSize: data.CustomProductSize || '',
//     });

//     const savedProduct = await newProduct.save();

//     res.status(201).json({
//       success: true,
//       product: savedProduct,
//       message: "Product added successfully with Cloudinary images",
//     });
//   } catch (error) {
//     console.error("Error in adding product:", error);
//     next(error);
//   }
// });



// const path = require("path");
// const fs = require("fs");
// const sharp = require("sharp");
// const mongoose = require("mongoose");
// const Product = require("../Model/productModel");
// const catchAsyncError = require("../Middleware/catchAsyncError");

// 🟢 Ensure uploads folder exists

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

exports.addProduct = catchAsyncError(async (req, res, next) => {
  try {
    const data = req.body;
    console.log("Incoming Data:", data);

    const files = req.files || [];
    const ProductPictures = [];

    console.log("Uploaded Files:", files.map(f => f.filename));

    // ✅ Compress and save uploaded images
    for (const file of files) {
      try {
        const originalName = path.parse(file.originalname).name;
        const sanitizedFileName = originalName.replace(/\s+/g, "_");

        const compressedPath = path.join(
          uploadDir,
          `compressed_${sanitizedFileName}_${Date.now()}.webp`
        );

        console.log("Processing:", file.path);

        await sharp(file.path)
          .resize({ width: 1200 })
          .webp({ quality: 60 })
          .toFile(compressedPath);

        // Delete original uploaded file
        fs.unlinkSync(file.path);

        // Store only relative path (e.g., "compressed_image.webp")
        const relativePath = path.basename(compressedPath);
        ProductPictures.push(relativePath);
      } catch (imgErr) {
        console.error("❌ Image compression error:", imgErr);
      }
    }

    // ✅ Validate and map category IDs
    // let formattedCategories = [];
    // if (Array.isArray(data.ProductsCategoriesMappings)) {
    //   formattedCategories = data.ProductsCategoriesMappings
    //     .filter(id => mongoose.Types.ObjectId.isValid(id))
    //     .map(id => new mongoose.Types.ObjectId(id));
    // }

    let formattedCategories = [];

    if (Array.isArray(data.ProductsCategoriesMappings)) {
      formattedCategories = data.ProductsCategoriesMappings.map(categoryId => new mongoose.Types.ObjectId(categoryId));
    } else if (data.ProductsCategoriesMappings) {
      formattedCategories = [new mongoose.Types.ObjectId(data.ProductsCategoriesMappings)];
    } else {
      console.error('ProductsCategoriesMappings is empty or invalid', data.ProductsCategoriesMappings);
    }


    // ✅ Validate discount mappings
    let discountMappings = [];
    if (Array.isArray(data.DiscountProductsMappings)) {
      discountMappings = data.DiscountProductsMappings
        .filter(id => mongoose.Types.ObjectId.isValid(id) && id.trim() !== "")
        .map(id => new mongoose.Types.ObjectId(id));
    }

    // ✅ Validate optional fields
    const productSize =
      data.ProductSize && mongoose.Types.ObjectId.isValid(data.ProductSize)
        ? new mongoose.Types.ObjectId(data.ProductSize)
        : undefined;

    const Tax =
      data.Tax && mongoose.Types.ObjectId.isValid(data.Tax)
        ? new mongoose.Types.ObjectId(data.Tax)
        : undefined;

    // ✅ Create product document
    const newProduct = new Product({
      ProductName: data.ProductName || "",
      ProductWeight: data.ProductWeight || "",
      ProductColor: data.ProductColor || "",
      Price: data.Price || 0,
      ShippingCharge: data.ShippingCharge || 0,
      AttachmentURL: data.AttachmentURL || "",
      Rating: data.Rating || 0,
      TotalReviews: data.TotalReviews || "0",
      ShortDescription: data.ShortDescription || "",
      FullDescription: data.FullDescription || "",
      VendorId: data.VendorId || "",
      Menufacturs: data.Menufacturs || null,
      MetaTitle: data.MetaTitle || "",
      MetaKeywords: data.MetaKeywords || "",
      MetaDescription: data.MetaDescription || "",
      OldPrice: data.OldPrice || null,
      IsShippingFree: data.IsShippingFree || false,
      EstimatedShippingDays: data.EstimatedShippingDays || 0,
      ShowOnHomePage: data.ShowOnHomePage || false,
      AllowCustomerReviews: data.AllowCustomerReviews || false,
      IsReturnAble: data.IsReturnAble || false,
      IsDigitalProduct: data.IsDigitalProduct || false,
      IsDiscountAllowed: data.IsDiscountAllowed || false,
      Sku: data.Sku || "",
      WarehouseId: data.WarehouseId || "",
      InventoryMethodId: data.InventoryMethodId || "",
      StockQuantity: data.StockQuantity || 0,
      IsBoundToStockQuantity: data.IsBoundToStockQuantity || false,
      DisplayStockQuantity: data.DisplayStockQuantity || false,
      OrderMinimumQuantity: data.OrderMinimumQuantity || 1,
      OrderMaximumQuantity: data.OrderMaximumQuantity || 100,
      MarkAsNew: data.MarkAsNew || false,
      DisplaySeqNo: data.DisplaySeqNo || 0,
      IsActive: data.IsActive !== "false",
      DiscountProductsMappings: discountMappings.length ? discountMappings : undefined,
      ProductSize: productSize,
      Tax: Tax,
      InternationCharge: data.InternationCharge || "",
      OrderItems: data.OrderItems || [],
      ProductPictures,
      ProductReviews: data.ProductReviews || [],
      ProductsCategoriesMappings: formattedCategories,
      ProductShippingMethodsMappings: data.ProductShippingMethodsMappings || "",
      ProductsTag: data.ProductsTag || [],
      AvailableStartDate: data.AvailableStartDate || "",
      AvailableEndDate: data.AvailableEndDate || "",
      CustomProductSize: data.CustomProductSize || "",
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      product: savedProduct,
      message: "✅ Product added successfully with compressed images",
    });
  } catch (error) {
    console.error("❌ Error in adding product:", error);
    next(error);
  }
});



// exports.getAllProducts = catchAsyncError(async (req, res, next) => {
//     const resultPerPage = 10; // Results per page (adjust as needed)
//     const productCount = await Product.countDocuments(); // Total product count

//     const apiFeature = new ApiFeatures(Product.find().sort({ createdAt: -1 }).populate(["DiscountProductsMappings", "ProductsCategoriesMappings", "Menufacturs","ProductSize","ProductReviews"]), req.query)
//         .search()
//         .filter()
//         .pagination(resultPerPage);

//     // Fetch the products based on the filters and pagination
//     const allProducts = await apiFeature.query;

//     // console.log(allProducts.length)

//     if (!allProducts) {
//         return next(new ErrorHandler("Products Not Found", 400)); // Custom error handler
//     }

//     res.status(200).json({
//         success: true,
//         productCount,
//         allProducts
//     });
// });





// ------------ All Working Well -----------

exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const productCount = await Product.countDocuments({ IsActive: true });
  const query = req.query
  console.log("Kya bhai mere tum thik se work nhi kar rahe ho kya hua hai", query)
  // const productSi = Number(query.PageSize) && Number(query.PageSize) > 0 ? Number(query.PageSize) : 10;
  const resultPerPage = 10;
  console.log("kya hai re", resultPerPage)

  // Add IsActive filter to query
  query.IsActive = true;

  if (query.CategoryName) {
    query.ProductsCategoriesMappings = query.CategoryName;
    delete query.CategoryName;
  }

  if (query.OrderByColumnName) {
    let sortOptions = {};

    switch (query.OrderByColumnName) {
      case 'Price ASC':
        sortOptions = { Price: 1 };
        break;
      case 'Price DESC':
        sortOptions = { Price: -1 };
        break;
      case 'Date ASC':
        sortOptions = { createdAt: 1 };
        break;
      case 'Date DESC':
        sortOptions = { createdAt: -1 };
        break;
      default:
        sortOptions = { createdAt: -1 };
        break;
    }
    const apiFeature = new ApiFeatures(Product.find({ IsActive: true }).sort(sortOptions).populate(["DiscountProductsMappings", "ProductsCategoriesMappings", "Menufacturs", "ProductSize", "ProductReviews"]), query).pagination(resultPerPage);
    const allProducts = await apiFeature.query;
    // delete query.OrderByColumnName;


    return res.status(200).json({
      success: true,
      productCount,
      allProducts,
      fetch: true
    })

  }


  const apiFeature = new ApiFeatures(Product.find({ IsActive: true }).sort({ createdAt: -1 }).populate(["DiscountProductsMappings", "ProductsCategoriesMappings", "Menufacturs", "ProductSize", "ProductReviews"]), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const allProducts = await apiFeature.query;

  // console.log(allProducts.length)

  if (!allProducts) {
    return next(new ErrorHandler("Products Not Found", 400)); // Custom error handler
  }

  res.status(200).json({
    success: true,
    productCount,
    allProducts
  });
});



// exports.getAllProducts = catchAsyncError(async (req, res, next) => {
//     const productCount = await Product.countDocuments();
//     const query = req.query
//     const resultPerPage = 10;
//     console.log("kya hai re", resultPerPage)

//     if (query.OrderByColumnName) {
//         let sortOptions = {};

//         switch (query.OrderByColumnName) {
//             case 'Price ASC':
//                 sortOptions = { Price: 1 };
//                 break;
//             case 'Price DESC':
//                 sortOptions = { Price: -1 };
//                 break;
//             case 'Date ASC':
//                 sortOptions = { createdAt: 1 };
//                 break;
//             case 'Date DESC':
//                 sortOptions = { createdAt: -1 };
//                 break;
//             default:
//                 sortOptions = { createdAt: -1 };
//                 break;
//         }
//         const apiFeature = new ApiFeatures(
//             Product.find({ ProductPictures: { $exists: true, $not: { $size: 0 } } }) 
//                 .sort(sortOptions)
//                 .populate(["DiscountProductsMappings", "ProductsCategoriesMappings", "Menufacturs", "ProductSize", "ProductReviews"]),
//             query
//         ).pagination(resultPerPage);
//         const allProducts = await apiFeature.query;

//         return res.status(200).json({
//             success: true,
//             productCount,
//             allProducts,
//             fetch: true
//         });
//     }

//     const apiFeature = new ApiFeatures(
//         Product.find({ ProductPictures: { $exists: true, $not: { $size: 0 } } }) // Same filter here to ensure we only fetch products with pictures
//             .sort({ createdAt: -1 })
//             .populate(["DiscountProductsMappings", "ProductsCategoriesMappings", "Menufacturs", "ProductSize", "ProductReviews"]),
//         req.query
//     )
//         .search()
//         .filter()
//         .pagination(resultPerPage);

//     const allProducts = await apiFeature.query;

//     if (!allProducts || allProducts.length === 0) {
//         return next(new ErrorHandler("Products with pictures not found", 400));
//     }

//     res.status(200).json({
//         success: true,
//         productCount,
//         allProducts
//     });
// });

// exports.getAllProducts = catchAsyncError(async (req, res, next) => {
//     const productCount = await Product.countDocuments();
//     const query = req.query;
//     const resultPerPage = 10;
//     console.log("kya hai re", resultPerPage);

//     // Build the sorting options based on the query parameters
//     let sortOptions = {};

//     if (query.OrderByColumnName) {
//         switch (query.OrderByColumnName) {
//             case 'Price ASC':
//                 sortOptions = { Price: 1 };
//                 break;
//             case 'Price DESC':
//                 sortOptions = { Price: -1 };
//                 break;
//             case 'Date ASC':
//                 sortOptions = { createdAt: 1 };
//                 break;
//             case 'Date DESC':
//                 sortOptions = { createdAt: -1 };
//                 break;
//             default:
//                 sortOptions = { createdAt: -1 };
//                 break;
//         }
//     } else {
//         sortOptions = { createdAt: -1 }; // Default sorting by creation date
//     }

//     // Fetch products that have ProductPictures (First priority)
//     const productsWithPictures = Product.find({ ProductPictures: { $exists: true, $not: { $size: 0 } } })
//         .sort(sortOptions)
//         .populate(["DiscountProductsMappings", "ProductsCategoriesMappings", "Menufacturs", "ProductSize", "ProductReviews"]);

//     // Fetch products that do not have ProductPictures
//     const productsWithoutPictures = Product.find({ ProductPictures: { $exists: false } })
//         .sort(sortOptions)
//         .populate(["DiscountProductsMappings", "ProductsCategoriesMappings", "Menufacturs", "ProductSize", "ProductReviews"]);

//     // Merge both queries and apply search, filter, and pagination
//     const apiFeatureWithPictures = new ApiFeatures(productsWithPictures, query)
//         .search()
//         .filter()
//         .pagination(resultPerPage);

//     const apiFeatureWithoutPictures = new ApiFeatures(productsWithoutPictures, query)
//         .search()
//         .filter()
//         .pagination(resultPerPage);

//     // Run both queries
//     const allProductsWithPictures = await apiFeatureWithPictures.query;
//     const allProductsWithoutPictures = await apiFeatureWithoutPictures.query;

//     // Combine the two arrays (products with pictures first)
//     const allProducts = [...allProductsWithPictures, ...allProductsWithoutPictures];

//     // Count total products (before pagination)
//     const totalCount = allProducts.length;

//     // Slice the array for pagination (only return `resultPerPage` products)
//     const paginatedProducts = allProducts.slice(0, resultPerPage);

//     if (paginatedProducts.length === 0) {
//         return next(new ErrorHandler("Products not found", 400));
//     }

//     res.status(200).json({
//         success: true,
//         productCount: totalCount,
//         allProducts: paginatedProducts,
//         fetch: true
//     });
// });




// exports.getAllProductsFeatured = catchAsyncError(async (req, res, next) => {
//     const productCount = await Product.countDocuments(); // Total product count

//     // Fetch the products based on the filters and pagination
//     const allProductsFeatures = await Product.find().sort({ createdAt: -1 }).populate(["DiscountProductsMappings", "ProductsCategoriesMappings", "Menufacturs", "ProductSize", "ProductReviews", "Tax"])

//     if (!allProductsFeatures) {
//         return next(new ErrorHandler("Products Not Found", 400)); // Custom error handler
//     }

//     res.status(200).json({
//         success: true,
//         productCount,
//         allProductsFeatures
//     });
// });




exports.getAllProductsFeatured = catchAsyncError(async (req, res, next) => {
  let { page, limit } = req.query;

  // Validate and set defaults for page and limit
  page = parseInt(page, 10) || 1; // Default page 1 if invalid
  limit = parseInt(limit, 10) || 10; // Default limit 10 if invalid

  // Ensure page and limit are positive numbers
  if (page < 1 || limit < 1) {
    return next(new ErrorHandler("Page and limit must be positive numbers", 400));
  }

  // Total product count
  const productCount = await Product.countDocuments();

  // Fetch the products based on pagination, sorting, and population
  const allProductsFeatures = await Product.find()
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate(["DiscountProductsMappings", "ProductsCategoriesMappings", "Menufacturs", "ProductSize", "ProductReviews", "Tax"])
    .select("ProductName Price StockQuantity IsActive ProductPictures createdAt OldPrice");

  if (!allProductsFeatures || allProductsFeatures.length === 0) {
    return next(new ErrorHandler("Products Not Found", 404)); // If no products found, return 404
  }

  res.status(200).json({
    success: true,
    productCount, // Total product count (for pagination)
    allProductsFeatures, // Paginated products
  });
});



// 👉👉🌿🌿 using Cloudinary

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const id = req.body;
  console.log(id);

  const product = await Product.findById(req.params.id);
  console.log(product);

  if (!product) {
    return next(new ErrorHandler(`Product does not exist with Id: ${req.params.id}`));
  }

  // Delete images from Cloudinary
  if (Array.isArray(product.ProductPictures)) {
    for (const image of product.ProductPictures) {
      if (image.public_id) {
        try {
          await cloudinary.uploader.destroy(image.public_id);
          console.log('Deleted from Cloudinary:', image.public_id);
        } catch (err) {
          console.error('Error deleting image from Cloudinary:', err);
          return next(new ErrorHandler('Error deleting image from Cloudinary', 500));
        }
      }
    }
  }

  // Delete the product from DB
  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted Successfully",
  });
});


exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  const id = req.body
  console.log(id)
  const getSingleProduct = await Product.findById(req.params.id).sort({ createdAt: -1 }).populate(["DiscountProductsMappings", "ProductsCategoriesMappings", "Menufacturs", "ProductReviews", "ProductSize", "Tax"])
  if (!getSingleProduct) {
    return next(ErrorHandler("Products Not Found", 400))
  }
  res.status(200).json({
    success: true,
    getSingleProduct

  })

})




//🌿🌿👉👉 Proper Working

exports.updateProductData = catchAsyncError(async (req, res, next) => {

  const data = req.body;
  console.log("Category Nhi mili hai ", data)
  

  let formattedCategories = [];

  if (Array.isArray(data.ProductsCategoriesMappings)) {
    formattedCategories = data.ProductsCategoriesMappings.map(categoryId => new mongoose.Types.ObjectId(categoryId));
  } else if (data.ProductsCategoriesMappings) {
    formattedCategories = [new mongoose.Types.ObjectId(data.ProductsCategoriesMappings)];
  } else {
    console.error('ProductsCategoriesMappings is empty or invalid', data.ProductsCategoriesMappings);
  }

  const product = await Product.findById(req.params.id);
  console.log("Product found:", product);

  if (!product) {
    return next(new ErrorHandler(`Product not found with Id: ${req.params.id}`, 404));
  }

  const formattedProductSize = data.ProductSize && typeof data.ProductSize === 'object' ? JSON.stringify(data.ProductSize) : data.ProductSize;

  // Logic for CustomProductSize and ProductSize
  let finalProductSize = product.ProductSize;
  let finalCustomProductSize = product.CustomProductSize;

  if (data.CustomProductSize && data.CustomProductSize.trim() !== "") {
    // If CustomProductSize is provided, set ProductSize to null
    finalProductSize = null;
    finalCustomProductSize = data.CustomProductSize;
  } else if (data.ProductSize && data.ProductSize.trim() !== "") {
    // If ProductSize is provided, set CustomProductSize to null
    finalCustomProductSize = null;
    finalProductSize = formattedProductSize;
  }

  if (JSON.stringify(data.ProductPictures) === JSON.stringify(product.ProductPictures)) {

    const updatedData = {
      ProductName: data.ProductName || product.ProductName,

      CustomProductSize: finalCustomProductSize,
      ProductSize: finalProductSize,
      
      ProductWeight: data.ProductWeight || product.ProductWeight,
      ProductColor: data.ProductColor || product.ProductColor,
      Price: data.Price || product.Price,
      ShippingCharge: data.ShippingCharge || product.ShippingCharge,
      AttachmentURL: data.AttachmentURL || product.AttachmentURL,
      Rating: data.Rating || product.Rating,
      TotalReviews: data.TotalReviews || product.TotalReviews,
      ShortDescription: data.ShortDescription || product.ShortDescription,
      FullDescription: data.FullDescription || product.FullDescription,
      VendorId: data.VendorId || product.VendorId,
      Menufacturs: data.Menufacturs || product.Menufacturs,
      Tax: data.Tax || product.Tax,
      MetaTitle: data.MetaTitle || product.MetaTitle,
      MetaKeywords: data.MetaKeywords || product.MetaKeywords,
      MetaDescription: data.MetaDescription || product.MetaDescription,
      OldPrice: data.OldPrice || product.OldPrice,
      IsShippingFree: data.IsShippingFree !== undefined ? data.IsShippingFree : product.IsShippingFree,
      EstimatedShippingDays: data.EstimatedShippingDays || product.EstimatedShippingDays,
      ShowOnHomePage: data.ShowOnHomePage || product.ShowOnHomePage,
      AllowCustomerReviews: data.AllowCustomerReviews || product.AllowCustomerReviews,
      IsReturnAble: data.IsReturnAble || product.IsReturnAble,
      IsDigitalProduct: data.IsDigitalProduct || product.IsDigitalProduct,
      IsDiscountAllowed: data.IsDiscountAllowed || product.IsDiscountAllowed,
      Sku: data.Sku || product.Sku,
      WarehouseId: data.WarehouseId || product.WarehouseId,
      InventoryMethodId: data.InventoryMethodId || product.InventoryMethodId,
      StockQuantity: data.StockQuantity || product.StockQuantity,
      IsBoundToStockQuantity: data.IsBoundToStockQuantity || product.IsBoundToStockQuantity,
      DisplayStockQuantity: data.DisplayStockQuantity || product.DisplayStockQuantity,
      OrderMinimumQuantity: data.OrderMinimumQuantity || product.OrderMinimumQuantity,
      OrderMaximumQuantity: data.OrderMaximumQuantity || product.OrderMaximumQuantity,
      MarkAsNew: data.MarkAsNew !== undefined ? data.MarkAsNew : product.MarkAsNew,
      DisplaySeqNo: data.DisplaySeqNo || product.DisplaySeqNo,
      IsActive: data.IsActive !== undefined ? data.IsActive : product.IsActive,
      DiscountProductsMappings: data.DiscountProductsMappings || product.DiscountProductsMappings,
      OrderItems: data.OrderItems || product.OrderItems,
      ProductPictures: product.ProductPictures,
      // ProductReviews: data.ProductReviews || product.ProductReviews,
      ProductsCategoriesMappings: formattedCategories,
      ProductShippingMethodsMappings: data.ProductShippingMethodsMappings || product.ProductShippingMethodsMappings,
      ProductsTag: data.ProductsTag || product.ProductsTag,
      AvailableStartDate: data.AvailableStartDate || product.AvailableStartDate,
      AvailableEndDate: data.AvailableEndDate || product.AvailableEndDate
    };

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedData, { new: true, runValidators: true }).populate('ProductsCategoriesMappings');

    return res.status(200).json({
      success: true,
      product: updatedProduct,
      message: "Product updated successfully"

    })

  }
  else {
    try {
      for (let oldImage of product.ProductPictures) {
        const oldImagePath = path.join(__dirname, `../uploads/${oldImage}`);
        try {
          await fs.unlink(oldImagePath); // Delete each old image
          console.log(`Old image deleted: ${oldImagePath}`);
        } catch (err) {
          if (err.code === 'ENOENT') {
            console.log(`Old image not found: ${oldImagePath}, skipping deletion.`);
          } else {
            console.error('Error deleting old image:', err);
            return next(new ErrorHandler('Error deleting old image', 500));
          }
        }
      }
    } catch (error) {
      console.error("Error in image deletion:", error);
      return next(new ErrorHandler("Error in image deletion", 500));
    }
  }
  const images = req.files ? req.files.map(file => path.basename(file.path)) : [];

  const updatedData = {
    ProductName: data.ProductName || product.ProductName,
    CustomProductSize: finalCustomProductSize,
    ProductSize: finalProductSize,

    Tax: data.Tax || product.Tax,

    ProductWeight: data.ProductWeight || product.ProductWeight,
    ProductColor: data.ProductColor || product.ProductColor,
    Price: data.Price || product.Price,
    ShippingCharge: data.ShippingCharge || product.ShippingCharge,
    AttachmentURL: data.AttachmentURL || product.AttachmentURL,
    Rating: data.Rating || product.Rating,
    TotalReviews: data.TotalReviews || product.TotalReviews,
    ShortDescription: data.ShortDescription || product.ShortDescription,
    FullDescription: data.FullDescription || product.FullDescription,
    VendorId: data.VendorId || product.VendorId,
    Menufacturs: data.Menufacturs || product.Menufacturs,
    MetaTitle: data.MetaTitle || product.MetaTitle,
    MetaKeywords: data.MetaKeywords || product.MetaKeywords,
    MetaDescription: data.MetaDescription || product.MetaDescription,
    OldPrice: data.OldPrice || product.OldPrice,
    IsShippingFree: data.IsShippingFree !== undefined ? data.IsShippingFree : product.IsShippingFree,
    EstimatedShippingDays: data.EstimatedShippingDays || product.EstimatedShippingDays,
    ShowOnHomePage: data.ShowOnHomePage || product.ShowOnHomePage,
    AllowCustomerReviews: data.AllowCustomerReviews || product.AllowCustomerReviews,
    IsReturnAble: data.IsReturnAble || product.IsReturnAble,
    IsDigitalProduct: data.IsDigitalProduct || product.IsDigitalProduct,
    IsDiscountAllowed: data.IsDiscountAllowed || product.IsDiscountAllowed,
    Sku: data.Sku || product.Sku,
    WarehouseId: data.WarehouseId || product.WarehouseId,
    InventoryMethodId: data.InventoryMethodId || product.InventoryMethodId,
    StockQuantity: data.StockQuantity || product.StockQuantity,
    IsBoundToStockQuantity: data.IsBoundToStockQuantity || product.IsBoundToStockQuantity,
    DisplayStockQuantity: data.DisplayStockQuantity || product.DisplayStockQuantity,
    OrderMinimumQuantity: data.OrderMinimumQuantity || product.OrderMinimumQuantity,
    OrderMaximumQuantity: data.OrderMaximumQuantity || product.OrderMaximumQuantity,
    MarkAsNew: data.MarkAsNew !== undefined ? data.MarkAsNew : product.MarkAsNew,
    DisplaySeqNo: data.DisplaySeqNo || product.DisplaySeqNo,
    IsActive: data.IsActive !== undefined ? data.IsActive : product.IsActive,
    DiscountProductsMappings: data.DiscountProductsMappings || product.DiscountProductsMappings,
    OrderItems: data.OrderItems || product.OrderItems,

    ProductPictures: images.length > 0 ? images : product.ProductPictures,

    // ProductReviews: data.ProductReviews || product.ProductReviews,
    ProductsCategoriesMappings: formattedCategories,
    ProductShippingMethodsMappings: data.ProductShippingMethodsMappings || product.ProductShippingMethodsMappings,
    ProductsTag: data.ProductsTag || product.ProductsTag,
    AvailableStartDate: data.AvailableStartDate || product.AvailableStartDate,
    AvailableEndDate: data.AvailableEndDate || product.AvailableEndDate

  };

  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedData, { new: true, runValidators: true }).populate('ProductsCategoriesMappings');

  res.status(200).json({
    success: true,
    product: updatedProduct,
    message: "Product updated successfully"
  });
});


//// 🌿🌿👉👉 Proper Working with Cloudinary

// exports.updateProductData = catchAsyncError(async (req, res, next) => {
//   const data = req.body;

//   const product = await Product.findById(req.params.id);
//   if (!product) {
//     return next(new ErrorHandler(`Product not found with Id: ${req.params.id}`, 404));
//   }

//   console.log("Product found:", product);
//   console.log("Data received for update:", data);
//   console.log("Files received:", req.files);

//   let formattedCategories = [];
//   if (Array.isArray(data.ProductsCategoriesMappings)) {
//     formattedCategories = data.ProductsCategoriesMappings.map(categoryId => new mongoose.Types.ObjectId(categoryId));
//   }

//   const formattedProductSize = data.ProductSize && typeof data.ProductSize === 'object' ? JSON.stringify(data.ProductSize) : data.ProductSize;

//   let imagesFromDB = product.ProductPictures || [];

//   // STEP 1: If images are changed, delete old from cloudinary
//   let newImages = [];
//   const isSameImages = JSON.stringify(data.ProductPictures) === JSON.stringify(imagesFromDB);

//   if (!isSameImages) {
//     // Delete old images from Cloudinary
//     for (const img of imagesFromDB) {
//       if (img.public_id) {
//         try {
//           await cloudinary.uploader.destroy(img.public_id);
//           console.log("Deleted from Cloudinary:", img.public_id);
//         } catch (err) {
//           console.error("Error deleting Cloudinary image:", err);
//         }
//       }
//     }

//     // Upload new images to Cloudinary
//     if (req.files && req.files.ProductPictures && req.files.ProductPictures.length > 0) {
//       const filesArray = Array.isArray(req.files.ProductPictures)
//         ? req.files.ProductPictures
//         : [req.files.ProductPictures];

//       for (const file of filesArray) {
//         const originalName = path.parse(file.name).name;
//         const sanitizedFileName = originalName.replace(/\s+/g, "_");

//         const tempCompressedPath = path.join(
//           os.tmpdir(),
//           `compressed_${sanitizedFileName}.webp`
//         );

//         await sharp(file.tempFilePath).resize({ width: 1200 })
//           .webp({ quality: 60 })
//           .toFile(tempCompressedPath);

//         const stats = fs.statSync(tempCompressedPath);
//         const fileSizeInKB = Math.round(stats.size / 1024);
//         console.log("✅ Compressed image size:", fileSizeInKB, "KB");

//         const result = await cloudinary.v2.uploader.upload(tempCompressedPath, {
//           folder: "products",
//           public_id: sanitizedFileName,
//           use_filename: true,
//           unique_filename: false,
//           overwrite: true,
//           resource_type: "image",
//         });

//         newImages.push({
//           public_id: result.public_id,
//           url: result.secure_url,
//         });

//         fs.unlinkSync(tempCompressedPath);
//       }
//     }

//   }

//   const updatedData = {
//     ProductName: data.ProductName || product.ProductName,
//     CustomProductSize: data.CustomProductSize || product.CustomProductSize,
//     ProductSize: product.ProductSize || formattedProductSize,
//     Tax: data.Tax || product.Tax,
//     InternationCharge: data.InternationCharge || product.InternationCharge,
//     ProductWeight: data.ProductWeight || product.ProductWeight,
//     ProductColor: data.ProductColor || product.ProductColor,
//     Price: data.Price || product.Price,
//     ShippingCharge: data.ShippingCharge || product.ShippingCharge,
//     AttachmentURL: data.AttachmentURL || product.AttachmentURL,
//     Rating: data.Rating || product.Rating,
//     TotalReviews: data.TotalReviews || product.TotalReviews,
//     ShortDescription: data.ShortDescription || product.ShortDescription,
//     FullDescription: data.FullDescription || product.FullDescription,
//     VendorId: data.VendorId || product.VendorId,
//     Menufacturs: data.Menufacturs || product.Menufacturs,
//     MetaTitle: data.MetaTitle || product.MetaTitle,
//     MetaKeywords: data.MetaKeywords || product.MetaKeywords,
//     MetaDescription: data.MetaDescription || product.MetaDescription,
//     OldPrice: data.OldPrice || product.OldPrice,
//     IsShippingFree: data.IsShippingFree !== undefined ? data.IsShippingFree : product.IsShippingFree,
//     EstimatedShippingDays: data.EstimatedShippingDays || product.EstimatedShippingDays,
//     ShowOnHomePage: data.ShowOnHomePage || product.ShowOnHomePage,
//     AllowCustomerReviews: data.AllowCustomerReviews || product.AllowCustomerReviews,
//     IsReturnAble: data.IsReturnAble || product.IsReturnAble,
//     IsDigitalProduct: data.IsDigitalProduct || product.IsDigitalProduct,
//     IsDiscountAllowed: data.IsDiscountAllowed || product.IsDiscountAllowed,
//     Sku: data.Sku || product.Sku,
//     WarehouseId: data.WarehouseId || product.WarehouseId,
//     InventoryMethodId: data.InventoryMethodId || product.InventoryMethodId,
//     StockQuantity: data.StockQuantity || product.StockQuantity,
//     IsBoundToStockQuantity: data.IsBoundToStockQuantity || product.IsBoundToStockQuantity,
//     DisplayStockQuantity: data.DisplayStockQuantity || product.DisplayStockQuantity,
//     OrderMinimumQuantity: data.OrderMinimumQuantity || product.OrderMinimumQuantity,
//     OrderMaximumQuantity: data.OrderMaximumQuantity || product.OrderMaximumQuantity,
//     MarkAsNew: data.MarkAsNew !== undefined ? data.MarkAsNew : product.MarkAsNew,
//     DisplaySeqNo: data.DisplaySeqNo || product.DisplaySeqNo,
//     IsActive: data.IsActive !== undefined ? data.IsActive : product.IsActive,
//     DiscountProductsMappings: data.DiscountProductsMappings || product.DiscountProductsMappings,
//     OrderItems: data.OrderItems || product.OrderItems,
//     ProductPictures: isSameImages ? imagesFromDB : newImages,
//     ProductsCategoriesMappings: formattedCategories,
//     ProductShippingMethodsMappings: data.ProductShippingMethodsMappings || product.ProductShippingMethodsMappings,
//     ProductsTag: data.ProductsTag || product.ProductsTag,
//     AvailableStartDate: data.AvailableStartDate || product.AvailableStartDate,
//     AvailableEndDate: data.AvailableEndDate || product.AvailableEndDate
//   };

//   const updatedProduct = await Product.findByIdAndUpdate(
//     req.params.id,
//     updatedData,
//     { new: true, runValidators: true }
//   ).populate('ProductsCategoriesMappings');

//   res.status(200).json({
//     success: true,
//     product: updatedProduct,
//     message: "Product updated successfully"
//   });
// });


// exports.bulkExcelUpload = catchAsyncError(async (req, res, next) => {
//     try {
//         if (!req.file) {
//             return res.status(400).send({ message: "No file uploaded!" });
//         }

//         const filePath = req.file.path; // Fixed: Correct file path
//         const fileExtension = req.file.mimetype.split("/")[1]; // Extract file extension
//         let products = [];

//         console.log("Processing file:", filePath);

//         if (fileExtension === "csv") {
//             // ✅ CSV Parsing (Fixed Async Handling)
//             bfs.createReadStream(filePath)
//                 .pipe(csvParser())
//                 .on("data", (row) => {
//                     try {
//                         products.push(parseProduct(row));
//                     } catch (err) {
//                         console.error("Skipping invalid row:", row, err.message);
//                     }
//                 })
//                 .on("end", async () => {
//                     if (products.length === 0) {
//                         return res.status(400).send({ message: "No valid products found!" });
//                     }
//                     await insertProductsIntoDB(products, filePath, res);
//                 })
//                 .on("error", (err) => {
//                     console.error("CSV Parsing Error:", err);
//                     res.status(500).send({ message: "Error parsing CSV file", error: err });
//                 });

//         } else if (fileExtension === "vnd.openxmlformats-officedocument.spreadsheetml.sheet" || fileExtension === "xlsx") {
//             // ✅ Excel Parsing
//             const workbook = xlsx.readFile(filePath);
//             const sheet = workbook.Sheets[workbook.SheetNames[0]];
//             const data = xlsx.utils.sheet_to_json(sheet);

//             if (data.length === 0) {
//                 return res.status(400).send({ message: "Excel file is empty!" });
//             }

//             data.forEach((row) => {
//                 try {
//                     products.push(parseProduct(row));
//                 } catch (err) {
//                     console.error("Skipping invalid row:", row, err.message);
//                 }
//             });

//             await insertProductsIntoDB(products, filePath, res);

//         } else {
//             res.status(400).send({ message: "Invalid file format. Upload a CSV or Excel file." });
//         }

//     } catch (error) {
//         console.error("Upload Error:", error);
//         res.status(500).send({ message: "Error uploading products", error: error.message });
//     }
// });


// function parseProduct(row) {
//     return {
//         AttachmentURL: row.AttachmentURL || "",
//         IsDiscountCreatePageSearchEnabled: row.IsDiscountCreatePageSearchEnabled === "TRUE",
//         Rating: parseFloat(row.Rating) || 0,
//         TotalReviews: parseInt(row.TotalReviews, 10) || 0,
//         ProductId: row.ProductId || "",
//         ProductName: row.ProductName || "Unknown Product",
//         ShortDescription: row.ShortDescription || "",
//         FullDescription: row.FullDescription || "",
//         VendorId: row.VendorId || "",
//         ManufacturerId: row.ManufacturerId || "",
//         MetaTitle: row.MetaTitle || "",
//         MetaKeywords: row.MetaKeywords || "",
//         MetaDescription: row.MetaDescription || "",
//         Price: parseFloat(row.Price) || 0,
//         OldPrice: parseFloat(row.OldPrice) || 0,
//         IsTaxExempt: row.IsTaxExempt === "TRUE",
//         IsShippingFree: row.IsShippingFree === "TRUE",
//         ShippingCharge: parseFloat(row.ShippingCharge) || 0,
//         EstimatedShippingDays: parseInt(row.EstimatedShippingDays, 10) || 0,
//         ShowOnHomePage: row.ShowOnHomePage === "TRUE",
//         AllowCustomerReviews: row.AllowCustomerReviews === "TRUE",
//         IsReturnAble: row.IsReturnAble === "TRUE",
//         IsDigitalProduct: row.IsDigitalProduct === "TRUE",
//         IsDiscountAllowed: row.IsDiscountAllowed === "TRUE",
//         Sku: row.Sku || "",
//         WarehouseId: row.WarehouseId || "",
//         InventoryMethodId: row.InventoryMethodId || "",
//         StockQuantity: parseInt(row.StockQuantity, 10) || 0,
//         IsBoundToStockQuantity: row.IsBoundToStockQuantity === "TRUE",
//         DisplayStockQuantity: row.DisplayStockQuantity === "TRUE",
//         OrderMinimumQuantity: parseInt(row.OrderMinimumQuantity, 10) || 1,
//         OrderMaximumQuantity: parseInt(row.OrderMaximumQuantity, 10) || 0,
//         MarkAsNew: row.MarkAsNew === "TRUE",
//         DisplaySeqNo: parseInt(row.DisplaySeqNo, 10) || 0,
//         IsActive: row.IsActive === "TRUE",

//         // ✅ FIX: Correctly parse ObjectId arrays
//         DiscountProductsMappings: parseObjectIdArray(row.DiscountProductsMappings),
//         OrderItems: parseObjectIdArray(row.OrderItems),
//         ProductDigitalFileMappings: parseObjectIdArray(row.ProductDigitalFileMappings),
//         ProductPictures: parseObjectIdArray(row.ProductPictures),
//         ProductReviews: parseObjectIdArray(row.ProductReviews),
//         ProductsCategoriesMappings: parseObjectIdArray(row.ProductsCategoriesMappings),
//         ProductShippingMethodsMappings: parseObjectIdArray(row.ProductShippingMethodsMappings),

//         // ✅ FIX: Ensure ProductSize & Tax are valid ObjectIds
//         ProductSize: parseObjectId(row.ProductSize),
//         Tax: parseObjectId(row.Tax),

//         ProductsTag: row.ProductsTag || "",
//         ProductColor: row.ProductColor || "",
//         ProductWeight: parseFloat(row.ProductWeight) || 0,
//         AvailableStartDate: row.AvailableStartDate ? new Date(row.AvailableStartDate) : new Date(),
//         AvailableEndDate: row.AvailableEndDate ? new Date(row.AvailableEndDate) : null,



//     };
// }

// // ✅ FIX: Function to Convert Array Fields into ObjectIds
// function parseObjectIdArray(value) {
//     if (!value || value === "[]") return []; // Empty array if no valid value
//     return value.split(",").map((id) => mongoose.Types.ObjectId.createFromHexString(id.trim())).filter(Boolean);
// }

// // ✅ FIX: Function to Convert Single Fields into ObjectId or null
// function parseObjectId(value) {
//     return mongoose.isValidObjectId(value) ? new mongoose.Types.ObjectId(value) : null;
// }

// // ✅ Function: Insert into MongoDB & Clean File
// async function insertProductsIntoDB(products, filePath, res) {
//     try {
//         await Product.insertMany(products);
//         bfs.unlinkSync(filePath); // Delete file after processing
//         console.log("Products inserted successfully:", products.length);
//         res.status(200).send({ message: "Products uploaded successfully!" });
//     } catch (error) {
//         console.error("Database Insert Error:", error);
//         res.status(500).send({ message: "Error inserting products into database", error: error.message });
//     }
// }





//// 🌿🌿👉👉 Bulk Excel Upload with multer


// exports.bulkExcelUpload = catchAsyncError(async (req, res, next) => {
//     try {
//         if (!req.file) {
//             return res.status(400).send({ message: "No file uploaded!" });
//         }

//         const filePath = req.file.path; // ✅ Corrected file path handling
//         const fileExtension = req.file.mimetype.split("/")[1]; // Extract file extension
//         let products = [];

//         console.log("📂 Processing file:", filePath);

//         if (fileExtension === "csv") {
//             // ✅ CSV Parsing with Proper Async Handling
//             bfs.createReadStream(filePath)
//                 .pipe(csvParser())
//                 .on("data", (row) => {
//                     try {
//                         products.push(parseProduct(row));
//                     } catch (err) {
//                         console.error("⚠️ Skipping invalid row:", row, err.message);
//                     }
//                 })
//                 .on("end", async () => {
//                     if (products.length === 0) {
//                         return res.status(400).send({ message: "No valid products found!" });
//                     }
//                     await insertProductsIntoDB(products, filePath, res);
//                 })
//                 .on("error", (err) => {
//                     console.error("❌ CSV Parsing Error:", err);
//                     res.status(500).send({ message: "Error parsing CSV file", error: err });
//                 });

//         } else if (fileExtension === "vnd.openxmlformats-officedocument.spreadsheetml.sheet" || fileExtension === "xlsx") {
//             // ✅ Excel Parsing
//             const workbook = xlsx.readFile(filePath);
//             const sheet = workbook.Sheets[workbook.SheetNames[0]];
//             const data = xlsx.utils.sheet_to_json(sheet);

//             if (data.length === 0) {
//                 return res.status(400).send({ message: "Excel file is empty!" });
//             }

//             data.forEach((row) => {
//                 try {
//                     products.push(parseProduct(row));
//                 } catch (err) {
//                     console.error("⚠️ Skipping invalid row:", row, err.message);
//                 }
//             });

//             await insertProductsIntoDB(products, filePath, res);

//         } else {
//             res.status(400).send({ message: "❌ Invalid file format. Upload a CSV or Excel file." });
//         }

//     } catch (error) {
//         console.error("❌ Upload Error:", error);
//         res.status(500).send({ message: "Error uploading products", error: error.message });
//     }
// });


// // ✅ Function to Parse Product Data
// function parseProduct(row) {
//     return {
//         AttachmentURL: row.AttachmentURL || "",
//         IsDiscountCreatePageSearchEnabled: row.IsDiscountCreatePageSearchEnabled === "TRUE",
//         Rating: parseFloat(row.Rating) || 0,
//         TotalReviews: parseInt(row.TotalReviews, 10) || 0,
//         ProductId: row.ProductId || "",
//         ProductName: row.ProductName || "Unknown Product",
//         ShortDescription: row.ShortDescription || "",
//         FullDescription: row.FullDescription || "",
//         VendorId: row.VendorId || "",
//         ManufacturerId: row.ManufacturerId || "",
//         MetaTitle: row.MetaTitle || "",
//         MetaKeywords: row.MetaKeywords || "",
//         MetaDescription: row.MetaDescription || "",
//         Price: parseFloat(row.Price) || 0,
//         OldPrice: parseFloat(row.OldPrice) || 0,
//         IsTaxExempt: row.IsTaxExempt === "TRUE",
//         IsShippingFree: row.IsShippingFree === "TRUE",
//         ShippingCharge: parseFloat(row.ShippingCharge) || 0,
//         EstimatedShippingDays: parseInt(row.EstimatedShippingDays, 10) || 0,
//         ShowOnHomePage: row.ShowOnHomePage === "TRUE",
//         AllowCustomerReviews: row.AllowCustomerReviews === "TRUE",
//         IsReturnAble: row.IsReturnAble === "TRUE",
//         IsDigitalProduct: row.IsDigitalProduct === "TRUE",
//         IsDiscountAllowed: row.IsDiscountAllowed === "TRUE",
//         Sku: row.Sku || "",
//         WarehouseId: row.WarehouseId || "",
//         InventoryMethodId: row.InventoryMethodId || "",
//         StockQuantity: parseInt(row.StockQuantity, 10) || 0,
//         IsBoundToStockQuantity: row.IsBoundToStockQuantity === "TRUE",
//         DisplayStockQuantity: row.DisplayStockQuantity === "TRUE",
//         OrderMinimumQuantity: parseInt(row.OrderMinimumQuantity, 10) || 1,
//         OrderMaximumQuantity: parseInt(row.OrderMaximumQuantity, 10) || 0,
//         MarkAsNew: row.MarkAsNew === "TRUE",
//         DisplaySeqNo: parseInt(row.DisplaySeqNo, 10) || 0,
//         IsActive: row.IsActive === "TRUE",

//         // ✅ FIX: Correctly parse ObjectId arrays
//         DiscountProductsMappings: parseObjectIdArray(row.DiscountProductsMappings),
//         OrderItems: parseObjectIdArray(row.OrderItems),
//         ProductDigitalFileMappings: parseObjectIdArray(row.ProductDigitalFileMappings),
//         ProductPictures: parseObjectIdArray(row.ProductPictures),
//         ProductReviews: parseObjectIdArray(row.ProductReviews),
//         ProductsCategoriesMappings: parseObjectIdArray(row.ProductsCategoriesMappings),
//         // ProductShippingMethodsMappings: parseObjectIdArray(row.ProductShippingMethodsMappings),
//         ProductShippingMethodsMappings: Array.isArray(row.ProductShippingMethodsMappings)
//         ? row.ProductShippingMethodsMappings.join(",") // Convert Array to CSV String
//         : typeof row.ProductShippingMethodsMappings === "string"
//         ? row.ProductShippingMethodsMappings
//         : "", // Default to empty string if invalid


//         // ✅ FIX: Ensure ProductSize & Tax are valid ObjectIds
//         ProductSize: parseObjectId(row.ProductSize),
//         Tax: parseObjectId(row.Tax),

//         ProductsTag: row.ProductsTag || "",
//         ProductColor: row.ProductColor || "",
//         ProductWeight: parseFloat(row.ProductWeight) || 0,
//         AvailableStartDate: row.AvailableStartDate ? new Date(row.AvailableStartDate) : new Date(),
//         AvailableEndDate: row.AvailableEndDate ? new Date(row.AvailableEndDate) : null,
//     };
// }

// // ✅ Function to Convert Array Fields into ObjectIds
// function parseObjectIdArray(value) {
//     if (!value || value === "[]") return []; // Empty array if no valid value
//     if (typeof value === "string") {
//         return value.split(",").map((id) => {
//             const trimmedId = id.trim();
//             return mongoose.isValidObjectId(trimmedId) ? new mongoose.Types.ObjectId(trimmedId) : null;
//         }).filter(Boolean);
//     }
//     return [];
// }

// // ✅ Function to Convert Single Fields into ObjectId or null
// function parseObjectId(value) {
//     return mongoose.isValidObjectId(value) ? new mongoose.Types.ObjectId(value) : null;
// }

// // ✅ Function: Insert into MongoDB & Clean File
// async function insertProductsIntoDB(products, filePath, res) {
//     try {
//         await Product.insertMany(products);
//         bfs.unlinkSync(filePath); // ✅ Fixed File Handling
//         console.log("✅ Products inserted successfully:", products.length);
//         res.status(200).send({ message: "Products uploaded successfully!" });
//     } catch (error) {
//         console.error("❌ Database Insert Error:", error);
//         res.status(500).send({ message: "Error inserting products into database", error: error.message });
//     }
// }




//// 🌿🌿👉👉 Bulk Excel Upload with Cloudinary Integration

exports.bulkExcelUpload = catchAsyncError(async (req, res, next) => {
  try {
    console.log("🔥 Bulk upload route hit!");
    console.log("📁 File received:", req.file);
    
    if (!req.file) {
      return res.status(400).send({ message: "No file uploaded!" });
    }

    const filePath = req.file.path;
    const fileExtension = req.file.mimetype.split("/")[1];
    let products = [];

    console.log("📂 Processing file:", filePath);

    const processAndInsert = async (data) => {
      for (const row of data) {
        try {
          const parsed = parseProduct(row);

          // Upload image(s) if provided
          if (row.ProductPictures && typeof row.ProductPictures === "string") {
            const paths = row.ProductPictures.split(",").map((img) => img.trim());
            const uploadedUrls = await uploadPicturesToCloudinary(paths);
            parsed.ProductPictures = uploadedUrls;
          }

          products.push(parsed);
        } catch (err) {
          console.error("⚠️ Skipping invalid row:", row, err.message);
        }
      }

      if (products.length === 0) {
        return res.status(400).send({ message: "No valid products found!" });
      }

      await insertProductsIntoDB(products, filePath, res);
    };

    if (fileExtension === "csv") {
      const rows = [];
      bfs.createReadStream(filePath)
        .pipe(csvParser())
        .on("data", (row) => rows.push(row))
        .on("end", async () => await processAndInsert(rows))
        .on("error", (err) => {
          console.error("❌ CSV Parsing Error:", err);
          res.status(500).send({ message: "Error parsing CSV file", error: err });
        });
    } else if (
      fileExtension === "vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      fileExtension === "xlsx"
    ) {
      const workbook = xlsx.readFile(filePath);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = xlsx.utils.sheet_to_json(sheet);
      await processAndInsert(data);
    } else {
      res.status(400).send({ message: "❌ Invalid file format. Upload a CSV or Excel file." });
    }
  } catch (error) {
    console.error("❌ Upload Error:", error);
    res.status(500).send({ message: "Error uploading products", error: error.message });
  }
});

function parseProduct(row) {
  console.log("🔍 Parsing row:", row);
  const parsed = {
    AttachmentURL: row.AttachmentURL || "",
    IsDiscountCreatePageSearchEnabled: row.IsDiscountCreatePageSearchEnabled === "TRUE",
    Rating: parseFloat(row.Rating) || 0,
    TotalReviews: parseInt(row.TotalReviews, 10) || 0,
    ProductId: row.ProductId || "",
    ProductName: row.ProductName || "Unknown Product",
    ShortDescription: row.ShortDescription || "",
    FullDescription: row.FullDescription || "",
    VendorId: row.VendorId || "",
    ManufacturerId: row.ManufacturerId || "",
    MetaTitle: row.MetaTitle || "",
    MetaKeywords: row.MetaKeywords || "",
    MetaDescription: row.MetaDescription || "",
    Price: parseFloat(row.Price) || 0,
    OldPrice: parseFloat(row.OldPrice) || 0,
    IsTaxExempt: row.IsTaxExempt === "TRUE",
    IsShippingFree: row.IsShippingFree === "TRUE",
    ShippingCharge: parseFloat(row.ShippingCharge) || 0,
    EstimatedShippingDays: parseInt(row.EstimatedShippingDays, 10) || 0,
    ShowOnHomePage: row.ShowOnHomePage === "TRUE",
    AllowCustomerReviews: row.AllowCustomerReviews === "TRUE",
    IsReturnAble: row.IsReturnAble === "TRUE",
    IsDigitalProduct: row.IsDigitalProduct === "TRUE",
    IsDiscountAllowed: row.IsDiscountAllowed === "TRUE",
    Sku: row.Sku || "",
    WarehouseId: row.WarehouseId || "",
    InventoryMethodId: row.InventoryMethodId || "",
    StockQuantity: parseInt(row.StockQuantity, 10) || 0,
    IsBoundToStockQuantity: row.IsBoundToStockQuantity === "TRUE",
    DisplayStockQuantity: row.DisplayStockQuantity === "TRUE",
    OrderMinimumQuantity: parseInt(row.OrderMinimumQuantity, 10) || 1,
    OrderMaximumQuantity: parseInt(row.OrderMaximumQuantity, 10) || 0,
    MarkAsNew: row.MarkAsNew === "TRUE",
    DisplaySeqNo: parseInt(row.DisplaySeqNo, 10) || 0,
    IsActive: row.IsActive === "TRUE",
    DiscountProductsMappings: parseObjectId(row.DiscountProductsMappings),
    OrderItems: parseObjectIdArray(row.OrderItems),
    ProductDigitalFileMappings: parseObjectIdArray(row.ProductDigitalFileMappings),
    ProductPictures: [],
    ProductReviews: parseObjectIdArray(row.ProductReviews),
    ProductsCategoriesMappings: parseObjectIdArray(row.ProductsCategoriesMappings),
    ProductShippingMethodsMappings: Array.isArray(row.ProductShippingMethodsMappings)
      ? row.ProductShippingMethodsMappings.join(",")
      : typeof row.ProductShippingMethodsMappings === "string"
        ? row.ProductShippingMethodsMappings
        : "",
    ProductSize: parseObjectId(row.ProductSize),
    Tax: parseObjectId(row.Tax),
    ProductsTag: row.ProductsTag || "",
    ProductColor: row.ProductColor || "",
    ProductWeight: parseFloat(row.ProductWeight) || 0,
    AvailableStartDate: row.AvailableStartDate ? new Date(row.AvailableStartDate) : new Date(),
    AvailableEndDate: row.AvailableEndDate ? new Date(row.AvailableEndDate) : null,
  };
  console.log("✅ Parsed product:", parsed);
  return parsed;
}

function parseObjectIdArray(value) {
  if (!value || value === "[]") return [];
  if (typeof value === "string") {
    return value
      .split(",")
      .map((id) => {
        const trimmedId = id.trim();
        return mongoose.isValidObjectId(trimmedId) ? new mongoose.Types.ObjectId(trimmedId) : null;
      })
      .filter(Boolean);
  }
  return [];
}

function parseObjectId(value) {
  return mongoose.isValidObjectId(value) ? new mongoose.Types.ObjectId(value) : null;
}

async function uploadPicturesToCloudinary(paths) {
  const uploadedUrls = [];
  for (const localPath of paths) {
    if (!localPath || localPath.startsWith("http")) {
      uploadedUrls.push(localPath); // Already hosted or empty
      continue;
    }
    try {
      const result = await cloudinary.uploader.upload(localPath, {
        folder: "products"
      });
      uploadedUrls.push(result.secure_url);
      fs.unlinkSync(localPath); // delete local image after upload
    } catch (error) {
      console.error("Cloudinary Upload Failed:", error);
    }
  }
  return uploadedUrls;
}

async function insertProductsIntoDB(products, filePath, res) {
  try {
    await Product.insertMany(products);
    bfs.unlinkSync(filePath);
    console.log("✅ Products inserted successfully:", products.length);
    res.status(200).send({ message: "Products uploaded successfully!" });
  } catch (error) {
    console.error("❌ Database Insert Error:", error);
    res.status(500).send({ message: "Error inserting products into database", error: error.message });
  }
}
