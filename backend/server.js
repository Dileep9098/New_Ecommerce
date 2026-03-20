const app = require("./app")
const dotenv=require("dotenv");
const connectDatabase = require("./Database/database");
const cloudinary = require("cloudinary").v2;
// const Razorpay = require("razorpay");

dotenv.config()

// const instance = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_SECRET,
// });

// module.exports.instance = instance;

// Handeling Uncaught Exception
// process.on("unhandledRejection",(err)=>{
//     console.log(`Error : ${err.message}`);
//     console.log(`Shutting down the server due to Unhandle Promise Rejection`)
//     process.exit(1)

// })

//config


connectDatabase()

  cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET 
    });



const server= app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})

// Unhandled Promise Rejection

// process.on("unhandledRejection",(err)=>{
//     console.log(`Error : ${err.message}`);
//     console.log(`Shutting down the server due to U/00000nhandle Promise Rejection`)

//     server.close(()=>{
//         process.exit(1)
//     })
// })
