const catchAsyncError = require("../Middlewares/catchAsyncError");
const Product = require("../Models/productModel");
const ProductReview = require("../Models/productReviewModel");

const ErrorHandler = require("../utils/errorhandler");

exports.addProductReview = catchAsyncError(async (req, res, next) => {
  const { ReviewBody, ReviewerEmail, ReviewerName, ReviewRating, ReviewTitle, ProductID } = req.body;

  // Validate required fields
  if (!ReviewBody || !ReviewerEmail || !ReviewerName || !ReviewRating || !ReviewTitle || !ProductID) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  // Validate ProductID
  const product = await Product.findById(ProductID);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
console.log("Kyta huaa tera jana mujhe samjh nhi hai kyo aisa tune kiya ",product.DiscountProductsMappings);

  // Create a new product review
  const productReview = await ProductReview.create({
    ReviewBody,
    ReviewerEmail,
    ReviewerName,
    ReviewRating,
    ReviewTitle,
    ProductID,
  });

  console.log("fdgfh fdghfghfdgh",productReview);

  if (!productReview) {
    return next(new ErrorHandler("Product review was not added", 400));
  }

  // Add the review ID to the product's reviews array
  product.ProductReviews.push(productReview._id);

 
  await product.save();

  // Respond with success
  res.status(200).json({
    success: true,
    productReview,
    message: "Product review added successfully, and product updated",
  });
});



exports.getAllProdcutSizes= catchAsyncError(async (req, res, next) => {

    const ProdcutSizes = await ProdcutSize.find()
    if (!ProdcutSizes) {
        return next(ErrorHandler(" ProdcutSizes Not Found", 400))
    }
    res.status(200).json({
        success: true,
        ProdcutSizes

    })

})

exports.deleteProdcutSizes= catchAsyncError(async (req, res, next) => {
    const id = req.body
    console.log(id)
    const prodcutSize = await ProdcutSize.findById(req.params.id);
    console.log(prodcutSize)

 

    await ProdcutSize.deleteOne();

    res.status(200).json({
        success: true,
        message: "ProdcutSize deleted Successfully"
    });

})

exports.updateProdcutSizes = catchAsyncError(async (req, res, next) => {
   
    const name = req.body.name
    const IsActive = req.body.IsActive

    const prodcutSize = await ProdcutSize.findById(req.params.id);
    console.log(prodcutSize)
    if (!prodcutSize) {
        return next(new ErrorHandler(`ProdcutSize does not exite with Id : ${req.params.id}`))
    }
  
    const newUserData = {
       name:name,
       IsActive:IsActive,
    };
    console.log(newUserData)
    const response = await ProdcutSize.findByIdAndUpdate(req.params.id, newUserData, { new: true, runValidators: true, })
    return res.status(200).json({
        success: true,
        response,
        message: "ProdcutSizes Updated Successfully !!"
    })

})
