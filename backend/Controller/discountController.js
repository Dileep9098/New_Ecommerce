const catchAsyncError = require("../Middlewares/catchAsyncError");
const Discount = require("../Models/discountModel");
const Product = require("../Models/productModel");
const ErrorHandler = require("../utils/errorhandler");

exports.addDiscount = catchAsyncError(async (req, res, next) => {
    const { title, DiscountType, DiscountValueType, DiscountValue, startDate, endDate, IsActive, couponCode, maxQuantity } = req.body;

    // Check for missing fields before querying the DB
    if (!DiscountValueType || !title) {
        return res.status(400).json({
            success: false,
            message: "Title and Discount Value Type are required"
        });
    }

    // // Validate IsActive (Boolean check)
    // if (typeof IsActive !== 'boolean') {
    //     return res.status(400).json({
    //         success: false,
    //         message: "IsActive must be a boolean value"
    //     });
    // }

    // Validate dates (startDate < endDate)
    if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (start >= end) {
            return res.status(400).json({
                success: false,
                message: "Start date must be before end date"
            });
        }
    }

  

    // Check for existing discount data
    const checkData = await Discount.findOne({title});

    if (checkData) {
        return res.status(400).json({
            success: false,
            message: "Discount with this Discount Value Type and Title already exists."
        });
    }

    // Create the discount
    const discountDetails = await Discount.create({
        title,
        DiscountType,
        DiscountValueType,
        DiscountValue,
        startDate,
        endDate,
        IsActive,
        couponCode,
        maxQuantity
    });

    if (!discountDetails) {
        return next(ErrorHandler("Discount was not added", 400));
    }

    res.status(200).json({
        success: true,
        discountDetails,
        message: "Discount added successfully"
    });
});



exports.getAllDiscountDetails = catchAsyncError(async (req, res, next) => {

    const discountDetails = await Discount.find()
    if (!discountDetails) {
        return next(ErrorHandler("Discount Details Not Found", 400))
    }
    res.status(200).json({
        success: true,
        discountDetails

    })

})

exports.deleteDiscountDetails = catchAsyncError(async (req, res, next) => {
    const id = req.body
    console.log(id)
    const discountDetails = await Discount.findById(req.params.id);
    console.log(discountDetails)


    await discountDetails.deleteOne();

    res.status(200).json({
        success: true,
        message: "Discount Details deleted Successfully"
    });

})

exports.updateDiscountDetails = catchAsyncError(async (req, res, next) => {

       const title=req.body.title
       const DiscountType=req.body.DiscountType
       const DiscountValueType=req.body.DiscountValueType
       const DiscountValue=req.body.DiscountValue
       const startDate=req.body.startDate
       const endDate=req.body.endDate
       const IsActive=req.body.IsActive
       const couponCode=req.body.couponCode
       const maxQuantity=req.body.maxQuantity

    const paymentMethod = await Discount.findById(req.params.id);
    console.log(paymentMethod)
    if (!paymentMethod) {
        return next(new ErrorHandler(`Discount Details not exite with Id : ${req.params.id}`))
    }

    const newUserData = {
         title:title,
         DiscountType:DiscountType,
         DiscountValueType:DiscountValueType,
         DiscountValue:DiscountValue,
         startDate:startDate,
         endDate:endDate,
         IsActive:IsActive,
         couponCode:couponCode,
         maxQuantity:maxQuantity
    };
    console.log(newUserData)
    const response = await Discount.findByIdAndUpdate(req.params.id, newUserData, { new: true, runValidators: true, })
    return res.status(200).json({
        success: true,
        response,
        message: "Discount Details Updated Successfully !!"
    })

})



// exports.couponCodeDiscount = catchAsyncError(async (req, res, next) => {
//     const data = req.body.cartJsonData;
//     console.log(data)
//     const getAllProduct=[]
//     // const getProductDetails =await Product.find()
//     if(Array.isArray(data)){
//         Array.isArray(data)&&data.forEach((item)=>{
//             console.log("kya hai re",item.ProductName)
//         })
//     }
//     else{
//         console.log("thiknhi ")
//     }

    // Check for missing fields before querying the DB
    // if (!DiscountValueType || !title) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Title and Discount Value Type are required"
    //     });
    // }

    // Validate dates (startDate < endDate)
    // if (startDate && endDate) {
    //     const start = new Date(startDate);
    //     const end = new Date(endDate);
    //     if (start >= end) {
    //         return res.status(400).json({
    //             success: false,
    //             message: "Start date must be before end date"
    //         });
    //     }
    // }


    // Check for existing discount data
    // const checkData = await Discount.findOne({title});

    // if (checkData) {
    //     return res.status(400).json({
    //         success: false,
    //         message: "Discount with this Discount Value Type and Title already exists."
    //     });
    // }

    // // Create the discount
    // const discountDetails = await Discount.create({
    //     title,
    //     DiscountType,
    //     DiscountValueType,
    //     DiscountValue,
    //     startDate,
    //     endDate,
    //     IsActive,
    //     couponCode,
    //     maxQuantity
    // });

    // if (!discountDetails) {
    //     return next(ErrorHandler("Discount was not added", 400));
    // }

    // res.status(200).json({
    //     success: true,
    //     discountDetails,
    //     message: "Discount added successfully"
    // });
// });



// exports.couponCodeDiscount = catchAsyncError(async (req, res, next) => {
//     const data = req.body.cartJsonData;
//     const CouponCode = req.body.CouponCode;
//     console.log(data);
    
//     const getAllProduct = [];

//     if (Array.isArray(data)) {
//         // Assuming 'Product' is your database model for product details
//         const productIds = data.map(item => item.ProductId);
        
//         try {
//             // Fetch products from your database that match the productIds
//             const products = await Product.find({ _id: { $in: productIds } }).populate("DiscountProductsMappings");

//             // Now you can loop through the data and find matching products
//             data.forEach((item) => {
//                 const product = products.find(p => p._id.toString() === item.ProductId);
//                 if (product) {
//                     console.log("Product found: ", product);
//                     const couponDetails=product.find(product.DiscountProductsMappings.couponCode==CouponCode)
//                     console.log("Coupon kya hau",couponDetails)
                    

//                     getAllProduct.push(product);
//                 } else {
//                     console.log("No product found for ID: ", item.ProductId);
//                 }
//             });

//             res.status(200).json({ products: getAllProduct });
//         } catch (error) {
//             console.log("Error fetching products: ", error);
//             res.status(500).json({ message: "Error fetching product details" });
//         }
//     } else {
//         console.log("Invalid cart data format");
//         res.status(400).json({ message: "Invalid cart data" });
//     }
// });




exports.couponCodeDiscount = catchAsyncError(async (req, res, next) => {
    const data = req.body.cartJsonData;
    const CouponCode = req.body.CouponCode;
   console.log("Data Kya hai bhai mere ",data);
    console.log("Coupon Code batao",CouponCode);
    
    
    const getAllProduct = [];
    const totalPrice = data.reduce((sum, item) => {
        // Multiply item price by quantity, parse it as integer, and add it to the sum
        return sum + (parseInt(item.Price) * parseInt(item.Quantity)+parseInt(item.ShippingCharges));
    }, 0); // Start the sum from 0
    
    console.log(totalPrice);
    
    // if(data){
    //     // data.map(item => item.Price*item.Quantity)
    //     data.map(item => 
    //         totalPrice=parseInt(item.Price*item.Quantity)
    //     )
    // }
    console.log("Total PAise",totalPrice)
    

    if (Array.isArray(data)) {
        // Assuming 'Product' is your database model for product details
        const productIds = data.map(item => item.ProductId)

        try {
            // Fetch products from your database that match the productIds and populate the DiscountProductsMappings
            const products = await Product.find({ _id: { $in: productIds } }).populate("DiscountProductsMappings");
            
            
            // Now you can loop through the data and find matching products
            data.forEach((item) => {
                const product = products.find(p => p._id.toString() === item.ProductId);
                if (product) {
                    console.log("Product found: ", product);

                    // Find the coupon that matches the couponCode within DiscountProductsMappings
                    const couponDetails = product.DiscountProductsMappings.find(mapping => mapping.couponCode === CouponCode);

                    if (couponDetails) {
                        console.log("Coupon found for product: ", couponDetails);

                        // Apply the discount here
                        const discountAmount = (couponDetails.DiscountValue / 100) * (item.Price*item.Quantity);
                        const discountedPrice = (item.Price*item.Quantity) - discountAmount;

                        // Add this discounted price to the product
                        product.DiscountedPrice = discountedPrice;

                        // Push product with coupon details into the result array
                        getAllProduct.push({
                            ...product.toObject(),
                            DiscountedPrice: discountedPrice,
                            discountAmount:discountAmount,
                            CouponCodeApplied: CouponCode,
                            CouponDetails: couponDetails // Add coupon details here for more information
                        });
                    } else {
                        console.log("No coupon found for this product with the given coupon code.");
                    }
                } else {
                    console.log("No product found for ID: ", item.ProductId);
                }
            });

            // console.log("paisa",totalPrice)


            // If no products matched the CouponCode, you could choose to return an appropriate message
            if (getAllProduct.length === 0) {
                return res.status(404).json({ message: "No products found with the given coupon code." });
            }

            // Send the response with all products and their respective discounts if any
            res.status(200).json({ products: getAllProduct });
        } catch (error) {
            console.log("Error fetching products: ", error);
            res.status(500).json({ message: "Error fetching product details" });
        }
    } else {
        console.log("Invalid cart data format");
        res.status(400).json({ message: "Invalid cart data" });
    }
});

