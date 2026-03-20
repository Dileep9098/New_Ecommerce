// const catchAsyncError = require("../Middlewares/catchAsyncError");
// const crypto = require('crypto');
// const merchantKey = 'SnJ6HfYJ';
// const salt = 'xcnaAlHCxA'
// exports.payUmoneyPayment = catchAsyncError(async (req, res, next) => {
//     console.log("Received request body:", req.body);
//     const { amount, email, phone, productinfo, firstname, cartProductsData, city, state, address1, productname, productqty, udf1, udf2 } = req.body;
  
//     // Generate a random transaction ID
//     const txnid = crypto.randomBytes(10).toString('hex');
  
//     // Log txnid and other values for debugging
//     console.log("Transaction ID:", txnid);
//     console.log("Formatted Amount:", parseFloat(amount).toFixed(2));
//     console.log("Product Info:", productinfo);
//     console.log("First Name:", firstname);
//     console.log("Email:", email);
//     console.log("City:", city);
//     console.log("State:", state);
//     console.log("Address:", address1);
//     console.log("ProductName:", productname);
//     console.log("Qty:", udf1);
//     // console.log("cartProductsData:", cartProductsData);
  
//     // Generate hash string (make sure to include new fields if necessary)
//     const hashString = `${merchantKey}|${txnid}|${parseFloat(amount).toFixed(2)}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;
//     console.log("Hash String:", hashString); // Log the hash string for debugging
  
//     const hash = crypto.createHash('sha512').update(hashString).digest('hex');
  
//     res.json({
//       txnid,
//       hash,
//       merchantKey,
//     });
// });


// exports.payUMoneyPaymentSuccess = catchAsyncError(async (req, res, next) => {
//     try {
//         console.log("Success Request Body:", req.body);
//         console.log("Success Request Query:", req.query);
//         console.log("Success Request Params:", req.params);
//         const queryParams = new URLSearchParams(req.body).toString();
    
//         // Redirect to the failure page with the query parameters
//         return res.redirect(`http://localhost:5173/order-response?${queryParams}`);
//       } catch (error) {
//         console.log("Error in failure handler:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//       }
// });


// exports.payUMoneyPaymentFail = catchAsyncError(async (req, res, next) => {
//     try {
//         console.log("Failure Request Body:", req.body);
//         console.log("Failure Request Query:", req.query);
//         console.log("Failure Request Params:", req.params);
    
//         // Convert req.body to query parameters
//         const queryParams = new URLSearchParams(req.body).toString();
    
//         // Redirect to the failure page with the query parameters
//         return res.redirect(`http://localhost:5173/order-response?${queryParams}`);
    
//       } catch (error) {
//         console.log("Error in failure handler:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//       }
// });



const catchAsyncError = require("../Middlewares/catchAsyncError");
const crypto = require('crypto');
const instance = require("../utils/razorpay");


const merchantKey = 'SnJ6HfYJ'; // Replace with actual Merchant Key
const salt = 'xcnaAlHCxA'; // Replace with actual Salt

exports.payUmoneyPayment = catchAsyncError(async (req, res, next) => {
    console.log("Received request body:", req.body);

    const { amount, email, phone, productinfo, firstname, city, state, address1, productname, udf1, udf2 } = req.body;

    // Generate a unique transaction ID
    const txnid = crypto.randomBytes(10).toString('hex');

    // Convert amount to a properly formatted string
    const formattedAmount = parseFloat(amount).toFixed(2);

    // Debugging logs
    console.log("Transaction ID:", txnid);
    console.log("Formatted Amount:", formattedAmount);
    console.log("Product Info:", productinfo);
    console.log("First Name:", firstname);
    console.log("Email:", email);
    console.log("City:", city);
    console.log("State:", state);
    console.log("Address:", address1);
    console.log("Product Name:", productname);
    console.log("Qty:", udf1);

    // PayU Hash Calculation
    const hashString = `${merchantKey}|${txnid}|${formattedAmount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;
    console.log("Hash String (Before Encoding):", hashString);

    const hash = crypto.createHash('sha512').update(hashString).digest('hex');
    console.log("Generated Hash:", hash);

    res.json({
        txnid,
        hash,
        merchantKey,
        amount: formattedAmount,
        email,
        phone,
        productinfo,
        firstname,
        city,
        state,
        address1,
        udf1,
        udf2,
        surl: "http://localhost:5173/pay-u-money-payment-success",
        furl: "http://localhost:5173/pay-u-money-payment-fail",
    });
});

exports.payUMoneyPaymentSuccess = catchAsyncError(async (req, res, next) => {
    try {
        console.log("Success Request Body:", req.body);

        const queryParams = new URLSearchParams(req.body).toString();
        return res.redirect(`http://localhost:5173/order-response?${queryParams}`);
    } catch (error) {
        console.error("Error in success handler:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

exports.payUMoneyPaymentFail = catchAsyncError(async (req, res, next) => {
    try {
        console.log("Failure Request Body:", req.body);

        const queryParams = new URLSearchParams(req.body).toString();
        return res.redirect(`http://localhost:5173/order-response?${queryParams}`);
    } catch (error) {
        console.error("Error in failure handler:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});








exports.createRazorPayOrder = async (req, res) => {
  try {
    const { amount, currency} = req.body;

    const options = {
      amount: amount, // paise me convert karna zaruri hai
      currency: currency,
    };

    console.log("Options:", options);

    const order = await instance.orders.create(options);

    console.log("Order:", order);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    console.error("Razorpay Error:", err);
    res.status(500).json({ error: err.message });
  }
};





exports.razorpayPayment = catchAsyncError(async (req, res, next) => {
  const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
    } = req.body;

    console.log(razorpay_order_id)
    console.log(razorpay_payment_id)
    console.log(razorpay_signature)

    // 1. Create generated signature with secret
    const generated_signature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

    // 2. Compare signatures

    console.log("generated Signature",generated_signature)
    if (generated_signature === razorpay_signature) {
        // Success
        return res.status(200).json({ success: true, message: "Payment verified successfully" });
    } else {
        // Signature mismatch
        return res.status(400).json({ success: false, message: "Invalid payment signature" });
    }
})  