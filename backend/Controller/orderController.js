// const Order = require("../models/orderModel");
// const Product = require("../models/productModel");
// const ErrorHander = require("../utils/errorhander");
// const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const { default: axios } = require("axios");

const catchAsyncError = require("../Middlewares/catchAsyncError");
const OrderItem = require("../Models/orderModel");
const PaymentMethod = require("../Models/paymentsMethodModel");
const Product = require("../Models/productModel");
const ShippingDetails = require("../Models/shippingDetailsModel");
const ShiprocketToken = require("../Models/shiprocketTokenModel");
const User = require("../Models/userModel");
const ErrorHandler = require("../utils/errorhandler");
const sendEmail = require("../utils/sendEmail");

// Create new Order
const generateOrderNumber = async () => {
  const orderCount = await OrderItem.countDocuments();
  const orderNumber = `OR#${(orderCount + 1).toString().padStart(8, '0')}`;
  console.log(orderNumber)
  return orderNumber;
};




// exports.newOrder = catchAsyncError(async (req, res, next) => {
//   const {
//     UserID,
//     OrderNote,
//     cartJsonData,
//     CouponCode,
//     paymentToken,
//     payPalOrderConfirmJson,
//     totalOrderPrice,
//   } = req.body;

//   const orderNumber = await generateOrderNumber(); // Generate the order number

//   const order = await OrderItem.create({
//     UserID,
//     OrderNote,
//     cartJsonData,
//     CouponCode,
//     paymentToken,
//     payPalOrderConfirmJson,
//     totalOrderPrice,
//     OrderNumber: orderNumber, // Save the generated order number
//   });

//   res.status(200).json({
//     success: true,
//     order,
//     ResponseMsg: "Order Placed Successfully",
//     OrderNumber: orderNumber, // Return the order number to the client
//   });
// });


// exports.newOrder = catchAsyncError(async (req, res, next) => {
//   const {
//     UserID,
//     OrderNote,
//     cartJsonData,
//     CouponCode,
//     paymentToken,
//     payPalOrderConfirmJson,
//     totalOrderPrice,
//     PaymentMethod,
//     bank_ref_num
//   } = req.body;

//   // Generate the order number
//   const orderNumber = await generateOrderNumber();

//   // Create the order
//   const order = await OrderItem.create({
//     UserID,
//     OrderNote,
//     cartJsonData,
//     CouponCode,
//     paymentToken,
//     payPalOrderConfirmJson,
//     totalOrderPrice,
//     PaymentMethod,
//     OrderNumber: orderNumber,
//     bank_ref_num: bank_ref_num || 0 // Default to 0 if no bank reference number is provided
//   });

//   // Create shipping details
//   const shippingDetail = {
//     orderItem: order._id,
//     UserID: order.UserID
//   };

//   // Save shipping details
//   await ShippingDetails.create(shippingDetail);

//   // Find user by ID
//   const user = await User.findById(order.UserID);
//   if (!user) {
//     return next(new ErrorHandler('User not found', 404)); // Return an error if user not found
//   }

//   // Email content (considered simple for now)
//   // const message = `Hello ${user.name},\n\nYour order has been successfully placed! Order Number: ${orderNumber}. We will notify you when your order ships.\n\nThank you for shopping with us!`;



//   const message = `<!DOCTYPE html>
// <html>
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Amazon Order Confirmation</title>
//     <style>
//         body {
//             font-family: Arial, sans-serif;
//             margin: 0;
//             padding: 0;
//             background-color: #f5f5f5;
//         }
//         .email-container {
//             max-width: 700px;
//             margin: 20px auto;
//             background: #fff;
//             padding: 20px;
//             border-radius: 10px;
//             box-shadow: 0 4px 8px rgba(0,0,0,0.1);
//         }
//         .header img {
//             width: 120px;
//         }
//         .header {
//             text-align: left;
//             font-size: 22px;
//             font-weight: bold;
//             margin-bottom: 20px;
//         }
//         .content {
//             text-align: left;
//         }
//         .order-summary {
//             background: #f9f9f9;
//             padding: 15px;
//             border-radius: 5px;
//             margin-top: 15px;
//         }
//         .order-item {
//             display: flex;
//             align-items: center;
//             border-bottom: 1px solid #ddd;
//             padding-bottom: 10px;
//             margin-bottom: 10px;
//         }
//         .order-item img {
//             width: 80px;
//             height: 80px;
//             margin-right: 15px;
//             border-radius: 5px;
//         }
//         .order-details {
//             flex-grow: 1;
//         }
//         .price {
//             text-align: right;
//             font-weight: bold;
//         }
//         .total-table {
//             width: 100%;
//             margin-top: 15px;
//             border-collapse: collapse;
//         }
//         .total-table td {
//             padding: 8px;
//             text-align: right;
//         }
//         .total-table tr:last-child td {
//             font-size: 18px;
//             font-weight: bold;
//             color: green;
//         }
//         .barcode {
//             text-align: center;
//             margin-top: 15px;
//         }
//         .footer {
//             text-align: center;
//             padding-top: 20px;
//             font-size: 12px;
//             color: #777;
//         }
//         .order-info {
//             display: flex;
//             justify-content: space-between;
//             background: #f9f9f9;
//             padding: 10px;
//             border-radius: 5px;
//             margin-top: 10px;
//         }
//     </style>
// </head>
// <body>
//     <div class="email-container">
//         <div class="header">
//             <img src="https://via.placeholder.com/120" alt="Amazon">
//             <p>Your order is confirmed!</p>
//         </div>
//         <div class="content">
//             <p><strong>Hello John,</strong></p>
//             <p>Your order has been confirmed and will be shipped in two days.</p>
//             <div class="order-info">
//                 <p><strong>Order Date:</strong> 12 March 2020</p>
//                 <p><strong>Order Number:</strong> OD44443424</p>
//                 <p><strong>Payment Method:</strong> Credit Card</p>
//                 <p><strong>Shipping Address:</strong> <span style="color: green;">New Delhi</span></p>
//             </div>
//             <div class="order-summary">
//                 <div class="order-item">
//                     <img src="https://stylesatlife.com/wp-content/uploads/2015/04/Formal-Shirts-for-Men-1.jpg" alt="Shirt">
//                     <div class="order-details">
//                         <p><strong>Ralco Formal Shirt for Men</strong></p>
//                         <p>Qty: 1pcs</p>
//                     </div>
//                     <p class="price">$70</p>
//                 </div>
//                 <div class="order-item">
//                     <img src="https://hideior.com/wp-content/uploads/2020/06/Formal-Belt-for-Men-Reversible-Black-Brown-Hand-Stitched.jpg" alt="Belt">
//                     <div class="order-details">
//                         <p><strong>Ralco Formal Belt for Men</strong></p>
//                         <p>Qty: 1pcs</p>
//                     </div>
//                     <p class="price">$50</p>
//                 </div>
//                 <table class="total-table">
//                     <tr>
//                         <td><strong>Subtotal:</strong></td>
//                         <td>$120</td>
//                     </tr>
//                     <tr>
//                         <td><strong>Shipping Fee:</strong></td>
//                         <td>$15</td>
//                     </tr>
//                     <tr>
//                         <td><strong>Tax:</strong></td>
//                         <td>$5</td>
//                     </tr>
//                     <tr>
//                         <td><strong>Discount:</strong></td>
//                         <td>-$25</td>
//                     </tr>
//                     <tr>
//                         <td><strong>Total:</strong></td>
//                         <td>$165</td>
//                     </tr>
//                 </table>
//             </div>
//             <div class="barcode">
//                 <img src="https://via.placeholder.com/150x50" alt="Barcode">
//                 <p>OD44443424</p>
//             </div>
//             <p><strong>Expected Delivery Date:</strong> <span style="color: green;">12 March 2020</span></p>
//         </div>
//         <div class="footer">
//             <p>Thanks for shopping with us!</p>
//             <p>Need Help? Call - 974493933</p>
//         </div>
//     </div>
// </body>
// </html>
// `

//   try {
//     // Send confirmation email to the user
//     await sendEmail({
//       email: user.email,
//       subject: `Parijat Handicraft - New Order Placed: Order #${orderNumber}`,
//       message,
//       isHTML: true // Ensure it's recognized as an HTML email

//     });

//     // Respond with success
//     res.status(200).json({
//       success: true,
//       order,
//       shippingDetails: shippingDetail,
//       ResponseMsg: "Order Placed Successfully",
//       OrderNumber: orderNumber,
//     });
//   } catch (error) {
//     return next(new ErrorHandler('Error sending email, please try again later.', 500)); // Handle email sending errors
//   }
// });






// exports.newOrder = catchAsyncError(async (req, res, next) => {
//   const {
//     UserID,
//     OrderNote,
//     cartJsonData,
//     CouponCode,
//     paymentToken,
//     payPalOrderConfirmJson,
//     totalOrderPrice,
//     PaymentMethod,
//     bank_ref_num,
//   } = req.body;

//   console.log("Received Cart Data:", cartJsonData);

//   // Ensure cartJsonData is an array
//   let cartItems = [];
//   try {
//     // If cartJsonData is a string, parse it into an array
//     cartItems = typeof cartJsonData === "string" ? JSON.parse(cartJsonData) : cartJsonData;

//     if (!Array.isArray(cartItems)) {
//       throw new Error("cartJsonData is not a valid array");
//     }
//   } catch (error) {
//     return next(new ErrorHandler("Invalid cart data format", 400));
//   }

//   // Generate the order number
//   const orderNumber = await generateOrderNumber();

//   // Create the order in the database
//   const order = await OrderItem.create({
//     UserID,
//     OrderNote,
//     cartJsonData: JSON.stringify(cartItems), // Store cart data as JSON string
//     CouponCode,
//     paymentToken,
//     payPalOrderConfirmJson,
//     totalOrderPrice,
//     PaymentMethod,
//     OrderNumber: orderNumber,
//     bank_ref_num: bank_ref_num || 0, // Default to 0 if no bank reference number is provided
//   });

//   // Create shipping details
//   const shippingDetail = await ShippingDetails.create({
//     orderItem: order._id,
//     UserID: order.UserID,
//   });

//   // Find user by ID
//   const user = await User.findById(order.UserID);
//   if (!user) {
//     return next(new ErrorHandler("User not found", 404));
//   }

//   // Generate the HTML for cart items
//   let cartItemsHTML = "";
//   let subtotal = 0;
//   cartItems.forEach((item) => {
//     const price = item.Price || 0;
//     subtotal += price * item.Quantity;
//     cartItemsHTML += `
//       <div class="order-item">
//         <img src="${item.DefaultImage}" alt="${item.ProductName}" style="width:80px; height:80px;">
//         <div class="order-details">
//           <p><strong>${item.ProductName}</strong></p>
//           <p>Qty: ${item.Quantity} pcs</p>
//         </div>
//         <p class="price">$${price}</p>
//       </div>
//     `;
//   });

//   // Email content with dynamic cart data
//   const message = `
//   <!DOCTYPE html>
//   <html>
//   <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>Order Confirmation</title>
//       <style>
//           body { font-family: Arial, sans-serif; background-color: #f5f5f5; }
//           .email-container { max-width: 700px; margin: 20px auto; background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
//           .header img { width: 120px; }
//           .header { font-size: 22px; font-weight: bold; margin-bottom: 20px; }
//           .content { text-align: left; }
//           .order-summary { background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 15px; }
//           .order-item { display: flex; align-items: center; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 10px; }
//           .order-item img { width: 80px; height: 80px; margin-right: 15px; border-radius: 5px; }
//           .order-details { flex-grow: 1; }
//           .price { text-align: right; font-weight: bold; }
//           .total-table { width: 100%; margin-top: 15px; border-collapse: collapse; }
//           .total-table td { padding: 8px; text-align: right; }
//           .total-table tr:last-child td { font-size: 18px; font-weight: bold; color: green; }
//           .footer { text-align: center; padding-top: 20px; font-size: 12px; color: #777; }
//       </style>
//   </head>
//   <body>
//       <div class="email-container">
//           <div class="header">
//               <img src="https://via.placeholder.com/120" alt="Logo">
//               <p>Your order is confirmed!</p>
//           </div>
//           <div class="content">
//               <p><strong>Hello ${user.name},</strong></p>
//               <p>Your order has been confirmed and will be shipped soon.</p>
//               <div class="order-summary">
//                   ${cartItemsHTML}
//                   <table class="total-table">
//                       <tr><td><strong>Subtotal:</strong></td><td>₹${subtotal}</td></tr>
//                       <tr><td><strong>Shipping Fee:</strong></td><td>$15</td></tr>
//                       <tr><td><strong>Tax:</strong></td><td>$5</td></tr>
//                       <tr><td><strong>Discount:</strong></td><td>-$25</td></tr>
//                       <tr><td><strong>Total:</strong></td><td>$${totalOrderPrice}</td></tr>
//                   </table>
//               </div>
//               <p><strong>Expected Delivery Date:</strong> <span style="color: green;">${new Date().toLocaleDateString()}</span></p>
//           </div>
//           <div class="footer">
//               <p>Thanks for shopping with us!</p>
//               <p>Need Help? Call - 974493933</p>
//           </div>
//       </div>
//   </body>
//   </html>
//   `;

//   try {
//     // Send confirmation email
//     await sendEmail({
//       email: user.email,
//       subject: `Parijat Handicraft - New Order Placed: Order #${orderNumber}`,
//       message,
//       isHTML: true,
//     });

//     // Respond with success
//     res.status(200).json({
//       success: true,
//       order,
//       shippingDetails: shippingDetail,
//       ResponseMsg: "Order Placed Successfully",
//       OrderNumber: orderNumber,
//     });
//   } catch (error) {
//     return next(new ErrorHandler("Error sending email, please try again later.", 500));
//   }
// });





// exports.newOrder = catchAsyncError(async (req, res, next) => {
//   const {
//     UserID,
//     OrderNote,
//     cartJsonData,
//     CouponCode,
//     paymentToken,
//     payPalOrderConfirmJson,
//     totalOrderPrice,
//     PaymentMethod,
//     bank_ref_num,
//     txnid,
//     mihpayid
//   } = req.body;

//   console.log("Received Cart Data:", cartJsonData);

//   // Ensure cartJsonData is parsed properly
//   let cartItems = [];
//   try {
//     cartItems = typeof cartJsonData === "string" ? JSON.parse(cartJsonData) : cartJsonData;
//     if (!Array.isArray(cartItems)) throw new Error("cartJsonData is not a valid array");
//   } catch (error) {
//     return next(new ErrorHandler("Invalid cart data format", 400));
//   }

//   // Generate Order Number
//   const orderNumber = await generateOrderNumber();

//   // Save Order to Database
//   const order = await OrderItem.create({
//     UserID,
//     OrderNote,
//     cartJsonData: JSON.stringify(cartItems),
//     CouponCode,
//     paymentToken,
//     payPalOrderConfirmJson,
//     totalOrderPrice,
//     PaymentMethod,
//     OrderNumber: orderNumber,
//     bank_ref_num: bank_ref_num || 0,
//     mihpayid: mihpayid || 0,
//     txnid: txnid || 0,
//   });

//   // Create Shipping Details
//   const shippingDetail = await ShippingDetails.create({
//     orderItem: order._id,
//     UserID: order.UserID,
//   });

//   // Fetch User Data
//   const user = await User.findById(order.UserID);
//   if (!user) {
//     return next(new ErrorHandler("User not found", 404));
//   }

//   // const paymentDetails = await PaymentMethod.find({ 'displaySeqNo': { $in: PaymentMethod } });

//   // if (!paymentDetails || paymentDetails.length === 0) {
//   //   return next(new ErrorHandler("No payment details found", 404));
//   // }

//   // Build Cart Items HTML & Calculate Prices

//   let cartItemsHTML = "";
//   let subtotal = 0;
//   let totalShippingCharges = 0;
//   let totalTaxPrice = 0

//   const calculateItemTaxTotal = (item) => {
//     return ((item.Price * ((item.Tax ? item.Tax : 0) / 100)) * (item.Quantity ?? 1)); // Tax % calculate
//   };
//   cartItems.forEach((item) => {
//     const price = item.Price || 0;
//     totalTaxPrice = calculateItemTaxTotal(item);

//     // console.log("Tax kya hai bhai",itemTaxTotal)

//     const shippingCharge = parseFloat(item.ShippingCharges) || 0;
//     subtotal += price * item.Quantity;
//     totalShippingCharges += shippingCharge;

//     cartItemsHTML += `
//       <div class="order-item">
//         <img src="${item.DefaultImage.url}" alt="${item.ProductName}" style="width:80px; height:80px;">
//         <div class="order-details">
//           <p><strong>${item.ProductName}</strong></p>
//           <p>Qty: ${item.Quantity} pcs</p>
//           <p>Shipping: <strong>₹${shippingCharge.toFixed(2)}</strong></p>
//         </div>
//         <p class="price">₹${(price * item.Quantity).toFixed(2)}</p>
//       </div>
//     `;
//   });

//   // Email Message
//   const message = `  
 
//  <!DOCTYPE html>
//   <html>
//   <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>Order Confirmation</title>
//       <style>
//           body { font-family: Arial, sans-serif; background-color: #f5f5f5; }
//           .email-container { max-width: 700px; margin: 20px auto; background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
//           .header img { width: 120px; }
//           .header { font-size: 22px; font-weight: bold; margin-bottom: 20px; }
//           .header p{
//             color: rgb(255, 255, 255);
//             padding: 6px;
//           }
//           .content { text-align: left; }
//           .order-summary { background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 15px; }
//           .order-item { display: flex; align-items: center; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 10px; }
//           .order-item img { width: 80px; height: 80px; margin-right: 15px; border-radius: 5px; }
//           .order-details { flex-grow: 1; }
//           .price { text-align: right; font-weight: bold; }
//           .total-table { width: 100%; margin-top: 15px; border-collapse: collapse; }
//           .total-table td { padding: 8px; text-align: right; }
//           .total-table tr:last-child td { font-size: 18px; font-weight: bold; color: green; }
//           .footer { text-align: center; padding-top: 20px; font-size: 12px; color: #777; }
//           .mainHeader{
//             background-color: #068f0a;
//     text-align: center;
//     border-radius: 5px;

//           }
//           #Payment{
//             text-align: end;
//           }
//              #Payment span{
//             font-weight: 700;
//           }
//       </style>
//   </head>
//   <body>
//       <div class="email-container">
//           <div class="header">
//               <img src="https://tse1.mm.bing.net/th?id=OIP.15w2BbSm5R_200egsLmrjwHaBe&pid=Api&P=0&h=180" alt="Logo">
//               <div class="mainHeader">
//                   <p>  Your order is confirmed ✓ </p>

//               </div>
//           </div>
//           <div class="content">
//               <p><strong>Hello ${user.name},</strong></p>
// <p>Your order has been confirmed<br>and will be shipped soon. We are preparing your items for dispatch and will send you an update once it's on its way. Thank you for shopping with us! Your satisfaction is our top priority.</p>
//               <div class="order-summary">
//                   ${cartItemsHTML}
//                   <table class="total-table">
//                       <tr><td><strong>Subtotal:</strong></td><td>₹${subtotal.toFixed(2)}</td></tr>
//                       <tr><td><strong>Shipping Charge:</strong></td><td>₹${totalShippingCharges.toFixed(2)}</td></tr>
//                       <tr><td><strong>Tax:</strong></td><td>₹${totalTaxPrice.toFixed(2)}</td></tr>
//                       <tr><td><strong>Discount Price:</strong></td><td>₹ ${CouponCode ? subtotal - totalOrderPrice : "00.00"}</td></tr>
//                       <tr><td><strong>Total:</strong></td><td>₹${totalOrderPrice.toFixed(2)}</td></tr>
//                   </table>
//               </div>
//               <p id="Payment" ><strong>Payment Method :</strong> <span style="color: green;">${PaymentMethod == 2 ? "Case On Delivery" : "PayU Money"}</span></p>
//           </div>
//           <div class="footer">
//               <p>Thanks for shopping with us!</p>
//               <p>Need Help? Call - +91-9953567333 </p>
//           </div>
//       </div>
//   </body>
//   </html>

//   `;


//   const messageForAdmin = `
//   <!DOCTYPE html>
//   <html>
//   <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>Order Confirmation</title>
//       <style>
//           body {
//               font-family: Arial, sans-serif;
//               margin: 0;
//               padding: 20px;
//               background-color: #f8f8f8;
//           }
//           .container {
//               max-width: 600px;
//               background: #ffffff;
//               padding: 20px;
//               margin: auto;
//               border-radius: 5px;
//               box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
//           }
//           h2 { color: #333; }
//           table {
//               width: 100%;
//               border-collapse: collapse;
//               margin-top: 10px;
//           }
//           th, td {
//               border: 1px solid #ddd;
//               padding: 10px;
//               text-align: left;
//           }
//           th { background-color: #f4f4f4; }
//           .total-row td {
//               font-weight: bold;
//               background: #f4f4f4;
//           }
//           .footer {
//               margin-top: 20px;
//               text-align: center;
//               color: #888;
//           }
//               .orderHearder{
//             text-align: center;
// background-image: linear-gradient(160deg, #13554d 0%, #00e986 100%);
// color:white;
// padding:0.1rem


//         }
//       </style>
//   </head>
//   <body>
//       <div class="container">
//           <img src="https://tse1.mm.bing.net/th?id=OIP.15w2BbSm5R_200egsLmrjwHaBe&pid=Api&P=0&h=180" alt="Logo" width="200">

//             <div class="orderHearder">
//                     <h3>Order Confirmation ✓ </h3>

//             </div>

//           <p>Thank you for your order. Below are the details:</p>
          
//           <h3>Order Details</h3>
//           <table>
//               <tr><th>Order ID</th><td>${order.OrderNumber}</td></tr>
//               <tr><th>Date Added</th><td>${new Date(order.createdAt).toLocaleDateString()}</td></tr>
//               <tr><th>Payment Method</th><td>${order.PaymentMethod === 1 ? "PayU Money" : "Cash On Delivery"}</td></tr>
//               <tr><th>Shipping Method</th><td>${totalShippingCharges || "Free Shipping"}</td></tr>
//           </table>
          
//           <h3>Customer Information</h3>
//           <table>
//               <tr><th>Email</th><td>${user.email}</td></tr>
//               <tr><th>Telephone</th><td>${user.phone || "Not Provided"}</td></tr>
//               <tr><th>Order Status</th><td>${order.Status || "Pending"}</td></tr>
//           </table>
          
//           <h3>Shipping & Billing Address</h3>
//           <table>
//               <tr>
//                   <th>Billing Address</th>
//                   <th>Shipping Address</th>
//               </tr>
//               <tr>
//                   <td>
//                       ${user.name}<br>
//                       ${user.shippingAddress || "Not Provided"}<br>
//                       ${user.CityName || "Not Provided"}, ${user.StateName || "Not Provided"}<br>
//                       ${user.PostalCode || "Not Provided"}, ${user.CountryName || "Not Provided"}
//                   </td>
//                   <td>
//                       ${user.name}<br>
//                       ${user.shippingAddress || "Not Provided"}<br>
//                       ${user.CityName || "Not Provided"}, ${user.StateName || "Not Provided"}<br>
//                       ${user.PostalCode || "Not Provided"}, ${user.CountryName || "Not Provided"}
//                   </td>
//               </tr>
//           </table>
          
//           <h3>Order Summary</h3>
//           <table>
//               <tr>
//                   <th>Product</th>
//                   <th>Model</th>
//                   <th>Quantity</th>
//                   <th>Price</th>
//                   <th>Total</th>
//               </tr>
//               ${cartItems.map(item => `
//               <tr>
//                   <td>${item.ProductName}</td>
//                   <td>${item.Sku ? item.Sku : item.ProductName}</td>
//                   <td>${item.Quantity}</td>
//                   <td>₹${item.Price.toFixed(2)}</td>
//                   <td>₹${(item.Price * item.Quantity).toFixed(2)}</td>
//               </tr>
//               `).join('')}
//               <tr class="total-row">
//                   <td colspan="4">Sub-Total</td>
//                   <td>₹${subtotal.toFixed(2)}</td>
//               </tr>
//               <tr class="total-row">
//                   <td colspan="4">Free Shipping</td>
//                   <td>₹${totalShippingCharges.toFixed(2)}</td>
//               </tr>
//               <tr class="total-row">
//                   <td colspan="4">GST</td>
//                   <td>₹${totalTaxPrice.toFixed(2)}</td>
//               </tr>
//                 <tr>
//                 <td colspan="4"><strong>Discount Price:</strong></td>
//                 <td>₹ ${CouponCode ? subtotal - totalOrderPrice : "00.00"}</td>
//                 </tr>
//               <tr class="total-row">
//                   <td colspan="4">Total</td>
//                   <td>₹${totalOrderPrice.toFixed(2)}</td>
//               </tr>
//           </table>
          
//           <p class="footer">Thank you for shopping with Parijat Handicraft.</p>
//       </div>
//   </body>
//   </html>
//   `;




//   try {
//     // Send Order Confirmation Email
//     await sendEmail({
//       email: user.email,
//       subject: `Parijat Handicraft - Order #${orderNumber} Confirmation`,
//       message,
//       isHTML: true,
//     });
//     //send for Admin
//     await sendEmail({
//       email: "info@parijathandicraft.com",
//       subject: `Parijat Handicraft - Order #${orderNumber} Confirmation`,
//       message: messageForAdmin,
//       isHTML: true,
//     });

//     // Response Success
//     res.status(200).json({
//       success: true,
//       order,
//       shippingDetails: shippingDetail,
//       ResponseMsg: "Order Placed Successfully",
//       OrderNumber: orderNumber,
//     });
//   } catch (error) {
//     return next(new ErrorHandler("Error sending email, please try again later.", 500));
//   }
// });





exports.newOrder = catchAsyncError(async (req, res, next) => {
  const {
    UserID,
    AddressID,
    OrderNote,
    cartJsonData,
    CouponCode,
    paymentToken,
    payPalOrderConfirmJson,
    totalOrderPrice,
    PaymentMethod,
    bank_ref_num,
    txnid,
    mihpayid
  } = req.body;

  console.log("Received Cart Data:", cartJsonData);

  // Ensure cartJsonData is parsed properly
  let cartItems = [];
  try {
    cartItems = typeof cartJsonData === "string" ? JSON.parse(cartJsonData) : cartJsonData;
    if (!Array.isArray(cartItems)) throw new Error("cartJsonData is not a valid array");
  } catch (error) {
    return next(new ErrorHandler("Invalid cart data format", 400));
  }

  // Generate Order Number
  const orderNumber = await generateOrderNumber();

  // Save Order to Database
  const order = await OrderItem.create({
    UserID,
    OrderNote,
    
    cartJsonData: JSON.stringify(cartItems),
    CouponCode,
    paymentToken,
    payPalOrderConfirmJson,
    totalOrderPrice,
    PaymentMethod,
    OrderNumber: orderNumber,
    bank_ref_num: bank_ref_num || 0,
    mihpayid: mihpayid || 0,
    txnid: txnid || 0,
  });

  // Create Shipping Details
  const shippingDetail = await ShippingDetails.create({
    orderItem: order._id,
    UserID: order.UserID,
    AddressID: AddressID,
  });

  // Fetch User Data
  const user = await User.findById(order.UserID);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // const paymentDetails = await PaymentMethod.find({ 'displaySeqNo': { $in: PaymentMethod } });

  // if (!paymentDetails || paymentDetails.length === 0) {
  //   return next(new ErrorHandler("No payment details found", 404));
  // }

  // Build Cart Items HTML & Calculate Prices
  let cartItemsHTML = "";
  let subtotal = 0;
  let totalShippingCharges = 0;
  let totalTaxPrice = 0

  const calculateItemTaxTotal = (item) => {
    return ((item.Price * ((item.Tax ? item.Tax : 0) / 100)) * (item.Quantity ?? 1)); // Tax % calculate
  };
  cartItems.forEach((item) => {
    const price = item.Price || 0;
    totalTaxPrice = calculateItemTaxTotal(item);

    // console.log("Tax kya hai bhai",itemTaxTotal)

    const shippingCharge = parseFloat(item.ShippingCharges) || 0;
    subtotal += price * item.Quantity;
    totalShippingCharges += shippingCharge;

    cartItemsHTML += `
      <div class="order-item">
        <img src="https://www.parijathandicraft.in/uploads/${item.DefaultImage}" alt="${item.ProductName}" style="width:80px; height:80px;">
        <div class="order-details">
          <p><strong>${item.ProductName}</strong></p>
          <p>Qty: ${item.Quantity} pcs</p>
          <p>Shipping: <strong>₹${shippingCharge.toFixed(2)}</strong></p>
        </div>
        <p class="price">₹${(price * item.Quantity).toFixed(2)}</p>
      </div>
    `;
  });

  // Email Message
  const message = `
 
 <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation</title>
      <style>
          body { font-family: Arial, sans-serif; background-color: #f5f5f5; }
          .email-container { max-width: 700px; margin: 20px auto; background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
          .header img { width: 120px; }
          .header { font-size: 22px; font-weight: bold; margin-bottom: 20px; }
          .header p{
            color: rgb(255, 255, 255);
            padding: 6px;
          }
          .content { text-align: left; }
          .order-summary { background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 15px; }
          .order-item { display: flex; align-items: center; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 10px; }
          .order-item img { width: 80px; height: 80px; margin-right: 15px; border-radius: 5px; }
          .order-details { flex-grow: 1; }
          .price { text-align: right; font-weight: bold; }
          .total-table { width: 100%; margin-top: 15px; border-collapse: collapse; }
          .total-table td { padding: 8px; text-align: right; }
          .total-table tr:last-child td { font-size: 18px; font-weight: bold; color: green; }
          .footer { text-align: center; padding-top: 20px; font-size: 12px; color: #777; }
          .mainHeader{
            background-color: #068f0a;
    text-align: center;
    border-radius: 5px;

          }
          #Payment{
            text-align: end;
          }
             #Payment span{
            font-weight: 700;
          }
      </style>
  </head>
  <body>
      <div class="email-container">
          <div class="header">
              <img src="https://tse1.mm.bing.net/th?id=OIP.15w2BbSm5R_200egsLmrjwHaBe&pid=Api&P=0&h=180" alt="Logo">
              <div class="mainHeader">
                  <p>  Your order is confirmed ✓ </p>

              </div>
          </div>
          <div class="content">
              <p><strong>Hello ${user.name},</strong></p>
<p>Your order has been confirmed<br>and will be shipped soon. We are preparing your items for dispatch and will send you an update once it's on its way. Thank you for shopping with us! Your satisfaction is our top priority.</p>
              <div class="order-summary">
                  ${cartItemsHTML}
                  <table class="total-table">
                      <tr><td><strong>Subtotal:</strong></td><td>₹${subtotal.toFixed(2)}</td></tr>
                      <tr><td><strong>Shipping Charge:</strong></td><td>₹${totalShippingCharges.toFixed(2)}</td></tr>
                      <tr><td><strong>Tax:</strong></td><td>₹${totalTaxPrice.toFixed(2)}</td></tr>
                      <tr><td><strong>Discount Price:</strong></td><td>₹ ${CouponCode ? subtotal - totalOrderPrice : "00.00"}</td></tr>
                      <tr><td><strong>Total:</strong></td><td>₹${totalOrderPrice.toFixed(2)}</td></tr>
                  </table>
              </div>
              <p id="Payment" ><strong>Payment Method :</strong> <span style="color: green;">${PaymentMethod == 2 ? "Case On Delivery" : "PayU Money"}</span></p>
          </div>
          <div class="footer">
              <p>Thanks for shopping with us!</p>
              <p>Need Help? Call - +91-9953567333 </p>
          </div>
      </div>
  </body>
  </html>

  `;


  const messageForAdmin = `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
              background-color: #f8f8f8;
          }
          .container {
              max-width: 600px;
              background: #ffffff;
              padding: 20px;
              margin: auto;
              border-radius: 5px;
              box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          }
          h2 { color: #333; }
          table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 10px;
          }
          th, td {
              border: 1px solid #ddd;
              padding: 10px;
              text-align: left;
          }
          th { background-color: #f4f4f4; }
          .total-row td {
              font-weight: bold;
              background: #f4f4f4;
          }
          .footer {
              margin-top: 20px;
              text-align: center;
              color: #888;
          }
              .orderHearder{
            text-align: center;
background-image: linear-gradient(160deg, #13554d 0%, #00e986 100%);
color:white;
padding:0.1rem


        }
      </style>
  </head>
  <body>
      <div class="container">
          <img src="https://tse1.mm.bing.net/th?id=OIP.15w2BbSm5R_200egsLmrjwHaBe&pid=Api&P=0&h=180" alt="Logo" width="200">

            <div class="orderHearder">
                    <h3>Order Confirmation ✓ </h3>

            </div>

          <p>Thank you for your order. Below are the details:</p>
          
          <h3>Order Details</h3>
          <table>
              <tr><th>Order ID</th><td>${order.OrderNumber}</td></tr>
              <tr><th>Date Added</th><td>${new Date(order.createdAt).toLocaleDateString()}</td></tr>
              <tr><th>Payment Method</th><td>${order.PaymentMethod === 1 ? "PayU Money" : "Cash On Delivery"}</td></tr>
              <tr><th>Shipping Method</th><td>${totalShippingCharges || "Free Shipping"}</td></tr>
          </table>
          
          <h3>Customer Information</h3>
          <table>
              <tr><th>Email</th><td>${user.email}</td></tr>
              <tr><th>Telephone</th><td>${user.phone || "Not Provided"}</td></tr>
              <tr><th>Order Status</th><td>${order.Status || "Pending"}</td></tr>
          </table>
          
          <h3>Shipping & Billing Address</h3>
          <table>
              <tr>
                  <th>Billing Address</th>
                  <th>Shipping Address</th>
              </tr>
              <tr>
                  <td>
                      ${user.name}<br>
                      ${user.shippingAddress || "Not Provided"}<br>
                      ${user.CityName || "Not Provided"}, ${user.StateName || "Not Provided"}<br>
                      ${user.PostalCode || "Not Provided"}, ${user.CountryName || "Not Provided"}
                  </td>
                  <td>
                      ${user.name}<br>
                      ${user.shippingAddress || "Not Provided"}<br>
                      ${user.CityName || "Not Provided"}, ${user.StateName || "Not Provided"}<br>
                      ${user.PostalCode || "Not Provided"}, ${user.CountryName || "Not Provided"}
                  </td>
              </tr>
          </table>
          
          <h3>Order Summary</h3>
          <table>
              <tr>
                  <th>Product</th>
                  <th>Model</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
              </tr>
              ${cartItems.map(item => `
              <tr>
                  <td>${item.ProductName}</td>
                  <td>${item.Sku ? item.Sku : item.ProductName}</td>
                  <td>${item.Quantity}</td>
                  <td>₹${item.Price.toFixed(2)}</td>
                  <td>₹${(item.Price * item.Quantity).toFixed(2)}</td>
              </tr>
              `).join('')}
              <tr class="total-row">
                  <td colspan="4">Sub-Total</td>
                  <td>₹${subtotal.toFixed(2)}</td>
              </tr>
              <tr class="total-row">
                  <td colspan="4">Free Shipping</td>
                  <td>₹${totalShippingCharges.toFixed(2)}</td>
              </tr>
              <tr class="total-row">
                  <td colspan="4">GST</td>
                  <td>₹${totalTaxPrice.toFixed(2)}</td>
              </tr>
                <tr>
                <td colspan="4"><strong>Discount Price:</strong></td>
                <td>₹ ${CouponCode ? subtotal - totalOrderPrice : "00.00"}</td>
                </tr>
              <tr class="total-row">
                  <td colspan="4">Total</td>
                  <td>₹${totalOrderPrice.toFixed(2)}</td>
              </tr>
          </table>
          
          <p class="footer">Thank you for shopping with Parijat Handicraft.</p>
      </div>
  </body>
  </html>
  `;




  try {
    // Send Order Confirmation Email
    // await sendEmail({
    //   email: user.email,
    //   subject: `Parijat Handicraft - Order #${orderNumber} Confirmation`,
    //   message,
    //   isHTML: true,
    // });
    // //send for Admin
    // await sendEmail({
    //   email: "info@parijathandicraft.com",
    //   subject: `Parijat Handicraft - Order #${orderNumber} Confirmation`,
    //   message: messageForAdmin,
    //   isHTML: true,
    // });

    // Response Success
    res.status(200).json({
      success: true,
      order,
      shippingDetails: shippingDetail,
      ResponseMsg: "Order Placed Successfully",
      OrderNumber: orderNumber,
    });
  } catch (error) {
    return next(new ErrorHandler("Error sending email, please try again later.", 500));
  }
});





exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await OrderItem.findById(req.params.id).populate("UserID");

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  const paymentDetails = await PaymentMethod.find({ 'displaySeqNo': { $in: order.PaymentMethod } });

  const cartItems = JSON.parse(order.cartJsonData);
  const productIds = cartItems.map(item => item.ProductId);

  const products = await Product.find({ '_id': { $in: productIds } })
    .populate({
      path: "DiscountProductsMappings",
      select: "couponCode DiscountValue"
    });

  const updatedProducts = products.map(product => {
    const discount = product.DiscountProductsMappings; 

    if (discount && discount.couponCode === order.CouponCode) {
      const discountValue = discount.DiscountValue || 0;
      const newPrice = product.Price - (product.Price * (discountValue / 100));
      return {
        ...product._doc,
        discountedPrice: newPrice.toFixed(2),
        discountValue,
      };
    }

    return product;
  });

  res.status(200).json({
    success: true,
    order: {
      ...order._doc,
      products: updatedProducts,
      paymentDetails
    },
  });
});



exports.myOrders = catchAsyncError(async (req, res, next) => {
  const data = req.body; // Get the data from the body
  console.log("Request Body:", data); // Log the full request body to see its contents
  const userID = data.UserID || req.body.UserID; // Extract UserID from request body

  if (!userID) {
    return res.status(400).json({
      success: false,
      message: 'UserID is required',
    });
  }

  const orders = await OrderItem.find({ UserID: userID });
  console.log("Found orders:", orders); // Log orders fetched from DB

  res.status(200).json({
    success: true,
    orders,
  });
});

exports.deleteMyOrders = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  console.log("Request Body:", data);

  const id = data.id || req.body.id;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: 'Order ID is required',
    });
  }

  try {
    // Use _id for the delete query, assuming you're using MongoDB
    const order = await OrderItem.deleteOne({ _id: id });
    const shippingDetails = await ShippingDetails.deleteOne({ 'orderItem': id });


    if (order.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    console.log("Deleted order:", order);

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting order:", error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while deleting the order.',
    });
  }
});


// // get all Orders -- Admin
// exports.getAllOrders = catchAsyncError(async (req, res, next) => {
//   const orders = await OrderItem.find().sort({ createdAt: -1 }).populate("UserID");

//   let totalAmount = 0;

//   orders.forEach((order) => {
//     totalAmount += parseFloat(order.totalOrderPrice);
//   });

//   console.log("Kya total hai",totalAmount)

//   res.status(200).json({
//     success: true,
//     totalAmount,
//     orders,
//   });
// });





exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  try {
    const orders = await OrderItem.find().sort({ createdAt: -1 }).populate("UserID");

    let totalAmount = 0;

    orders.forEach((order) => {
      const orderPrice = order.totalOrderPrice;
      if (orderPrice !== null && orderPrice !== undefined && !isNaN(parseFloat(orderPrice))) {
        totalAmount += parseFloat(orderPrice);
      }
      //  else {
      //   console.log("Invalid Order Price:", orderPrice); // For debugging invalid values
      // }
    });

    console.log("Final Total Amount:", totalAmount); // Check totalAmount before sending response

    res.status(200).json({
      success: true,
      totalAmount,
      orders,
    });
  } catch (error) {
    next(error); // Pass any error to the global error handler
  }
});


// // update Order Status -- Admin
// exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
//   const order = await Order.findById(req.params.id);

//   if (!order) {
//     return next(new ErrorHander("Order not found with this Id", 404));
//   }

//   if (order.orderStatus === "Delivered") {
//     return next(new ErrorHander("You have already delivered this order", 400));
//   }

//   if (req.body.status === "Shipped") {
//     order.orderItems.forEach(async (o) => {
//       await updateStock(o.product, o.quantity);
//     });
//   }
//   order.orderStatus = req.body.status;

//   if (req.body.status === "Delivered") {
//     order.deliveredAt = Date.now();
//   }

//   await order.save({ validateBeforeSave: false });
//   res.status(200).json({
//     success: true,
//   });
// });

// async function updateStock(id, quantity) {
//   const product = await Product.findById(id);

//   product.Stock -= quantity;

//   await product.save({ validateBeforeSave: false });
// }

// // delete Order -- Admin
// exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
//   const order = await Order.findById(req.params.id);

//   if (!order) {
//     return next(new ErrorHander("Order not found with this Id", 404));
//   }

//   await order.remove();

//   res.status(200).json({
//     success: true,
//   });
// });




// exports.addShippingDetails = catchAsyncError(async (req, res, next) => {
//   // Fetch order details using order ID
//   const order = await OrderItem.findById(req.params.id).populate("UserID");

//   if (!order) {
//     return next(new ErrorHander("Order not found with this Id", 404));
//   }

//   const cartItems = JSON.parse(order.cartJsonData);

//   for (const item of cartItems) {
//     const shippingDetail = {
//       orderItem: order._id, 
//       ProductImage: item.DefaultImage,
//       ProductName: item.ProductName,
//       shippingStatus:order.Status

//     };

//     await ShippingDetails.create(shippingDetail);
//   }

//   res.status(200).json({
//     success: true,
//     message: "Shipping details added successfully."
//   });
// });


exports.getShippingDetails = catchAsyncError(async (req, res, next) => {
  // Fetch order details using order ID
  const shippingDetails = await ShippingDetails.find({ 'orderItem': { $in: req.params.id } }).populate(["orderItem", "UserID","AddressID"]);

  if (!shippingDetails) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    shippingDetails,
    message: "Shipping details successfully."
  });
});

// Update Shipping Details

exports.updateShippingDetails = catchAsyncError(async (req, res, next) => {
  const data = req.body;
  console.log("update Data me Details kya hai", data);

  // Find the ShippingDetails by orderItem ID
  const shippingDetails = await ShippingDetails.findOne({ 'orderItem': { $in: req.params.id } }).populate(["orderItem", "UserID"]);

  if (!shippingDetails) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  // Update the shipping details with the new data
  shippingDetails.shipper = data.Shipper || shippingDetails.shipper;
  shippingDetails.length = data.length || shippingDetails.length;
  shippingDetails.height = data.height || shippingDetails.height;
  shippingDetails.weight = data.weight || shippingDetails.weight;
  shippingDetails.breadth = data.breadth || shippingDetails.breadth;
  shippingDetails.TrackingNumber = data.TrackingNumber || shippingDetails.TrackingNumber;
  shippingDetails.departure_date = data.departureDate || shippingDetails.departure_date;
  shippingDetails.receiver_date = data.receivedDate || shippingDetails.receiver_date;
  shippingDetails.shippingMethod = data.shippingMethod || shippingDetails.shippingMethod;
  shippingDetails.shippingStatus = data.ShippingStatus || shippingDetails.shippingStatus;  // Fixed this line
  shippingDetails.receiver_name = data.receiverName || shippingDetails.receiver_name;
  shippingDetails.receiver_mobile = data.receiverMobile || shippingDetails.receiver_mobile;
  shippingDetails.receiver_indentity_no = data.receiverIdentityNo || shippingDetails.receiver_indentity_no;

  // Save the updated shipping details
  await shippingDetails.save();

  const findOrder = await OrderItem.findById(req.params.id);

  if (findOrder) {
    findOrder.Status = data.ShippingStatus || findOrder.Status;
    await findOrder.save();
    console.log("Order Ka Status kya hai", findOrder.Status);
  } else {
    return next(new ErrorHandler("OrderItem not found with this Id", 404));
  }


  // -----------------------------------------||||||   Check Shiprocket Token   ||||------------------------

  try {
    if (data.ShippingStatus === "Shipped") {
      const tokenValid = await ShiprocketToken.find();
      console.log("Mil kya kya rha hai", tokenValid);

      const added_on = tokenValid[0].added_on;
      const current_time = Date.now();
      const added_on_timestamp = new Date(added_on).getTime();
      const diff_time = (current_time - added_on_timestamp) / 1000;
      console.log("Time Different Kya hai (in seconds)", diff_time);

      let AddShiprocketInfo;
      if (diff_time > 0) {
        const token = await generateShipRocketToken();
        console.log("Token mila kya", token);
        const shippingDetails = await ShippingDetails.findOne({ 'orderItem': { $in: req.params.id } }).populate(["orderItem", "UserID"]);

        AddShiprocketInfo = await PlaceAndConfirmCustomerOrder({ token: token, order_id: req.params.id, length: shippingDetails.length, height: shippingDetails.height, weight: shippingDetails.weight, breadth: shippingDetails.baseModelName })
      }
      else {
        const token = tokenValid[0].token
        const shippingDetails = await ShippingDetails.findOne({ 'orderItem': { $in: req.params.id } }).populate(["orderItem", "UserID"]);

        AddShiprocketInfo = await PlaceAndConfirmCustomerOrder({ token: token, order_id: req.params.id, length: shippingDetails.length, height: shippingDetails.height, weight: shippingDetails.weight, breadth: shippingDetails.baseModelName })
      }



      console.log("Shiprocket ka response kya hau", AddShiprocketInfo)

      shippingDetails.shiprocket_order_id = AddShiprocketInfo.order_id || AddShiprocketInfo.channel_order_id
      shippingDetails.shiprocket_shipment_id = AddShiprocketInfo.shipment_id || AddShiprocketInfo.channel_order_id
      await shippingDetails.save();

    }
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({
    success: true,
    message: "Shipping details and order status updated successfully",
    shippingDetails
  });
});


const generateShipRocketToken = async () => {
  const email = "dileepsahu0873@gmail.com";
  const password = "Dileep@0873";

  // Fetch the current Shiprocket token data
  const updateData = await ShiprocketToken.find();

  // Make the request to Shiprocket API
  const response = await axios.post('https://apiv2.shiprocket.in/v1/external/auth/login', { email, password });
  console.log("Shiprocket response: ", response.data);

  // Update the first document in updateData with the new token and timestamp
  const tokenData = updateData[0];
  tokenData.added_on = Date.now();
  tokenData.token = response.data.token;

  // Save the updated document
  await tokenData.save();

  // Return the new token
  return response.data.token;
}

const PlaceAndConfirmCustomerOrder = async (param) => {
  const { token, order_id, length, height, weight, breadth } = param;

  if (!token) {
    console.log("Shiprocket token not available.");
    return;
  }

  // Fetch order details with user information
  const orderDetails = await OrderItem.findById(order_id).populate("UserID");
  if (!orderDetails) {
    console.log("Order not found.");
    return;
  }

  console.log("j,kjhmhj gjgjmvnghn v mvj mhbvnnbvn orderDetails",orderDetails)

  const user = orderDetails.UserID;
  const cartItems = orderDetails.cartJsonData.length > 0 ? JSON.parse(orderDetails.cartJsonData[0]) : [];

  if (!cartItems || cartItems.length === 0) {
    console.log("Cart items are missing.");
    return;
  }

  // Assuming payment method details are fetched from PaymentMethod
  const paymentDetails = await PaymentMethod.find({ 'displaySeqNo': { $in: [orderDetails.PaymentMethod] } });
  const paymentMethod = paymentDetails.length > 0 ? paymentDetails[0].name : 'Unknown';

  const params = {
    "order_id": `order_${order_id}`,
    "order_date": new Date().toISOString(),
    "pickup_location": "PARIJAT HANDICRAFT",
    "comment": "Reseller: M/s Goku",
    "billing_customer_name": user.name,
    "billing_last_name": user.lname,
    "billing_address": user.address,
    "billing_city": user.CityName,
    "billing_pincode": user.PostalCode,
    "billing_state": user.StateName,
    "billing_country": user.CountryName,
    "billing_email": user.email,
    "billing_phone": user.phone,
    "shipping_is_billing": true,
    "shipping_customer_name": user.name,
    "shipping_last_name": user.lname,
    "shipping_address": user.address,
    "shipping_city": user.CityName,
    "shipping_pincode": user.PostalCode,
    "shipping_country": user.CountryName,
    "shipping_state": user.StateName,
    "shipping_email": user.email,
    "shipping_phone": user.phone,
    "order_items": cartItems.map(item => ({
      name: item.ProductName,
      sku: item.ProductId,
      units: item.Quantity,
      selling_price: item.Price || 0,
    })),
    "payment_method": paymentMethod == "PayU" ? "Prepaid" : paymentMethod,
    "sub_total": orderDetails.totalOrderPrice,
    "total_discount": orderDetails.totalDiscount || 0,
    "length": length || 10,
    "breadth": breadth || 15,
    "height": height || 20,
    "weight": weight || 2.5,
  };

  // Validate required fields
  if (!params.billing_customer_name || !params.billing_address || !params.billing_phone || !params.billing_pincode || !params.order_items) {
    console.log("Some required billing or order item fields are missing.");
    return;
  }

  try {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    };

    console.log("Shiprocket Order Request Data: ", JSON.stringify(params, null, 2));

    const response = await axios.post('https://apiv2.shiprocket.in/v1/external/orders/create/adhoc', params, { headers });

    console.log("Shiprocket Order Response: ", response.data);

    if (response.data.error) {
      console.log("Error in Shiprocket response: ", response.data.error);
    } else {
      console.log("Order successfully placed with Shiprocket.");
      return response.data
    }

  } catch (error) {
    console.error("Error sending order to Shiprocket:", error);
    if (error.response) {
      console.error("Shiprocket API Error Response: ", error.response.data);
    }
  }
};


//   const productIds = cartItems.map(item => item.ProductId);
//   const products = await Product.find({ '_id': { $in: productIds } });

//   res.status(200).json({
//     success: true,
//     order: {
//       ...order._doc,
//       products,
//     },
//   });
// });