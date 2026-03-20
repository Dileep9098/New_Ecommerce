// const mongoose = require("mongoose");

// const connectDatabase = () => {
//     mongoose.connect(process.env.DB_URI).then((data) => {
//         console.log(`Mongodb connected with server:`);
//     })
// };

// module.exports = connectDatabase;


// const mongoose =require('mongoose')

// const connectDatabase=()=>{
//     mongoose.connect(process.env.DB_URI,{
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//     .then((data)=>{
//         console.log(`Mongodb connected with server: ${data.connection.host}`);
//     })
// }
// module.exports=connectDatabase



const mongoose = require('mongoose');

// Define the connection function
const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI)
    .then((data) => {
        console.log(`MongoDB connected with server: ${data.connection.host}`);
    })
    .catch((err) => {
        console.error("Database connection error: ", err);
    });
};

module.exports = connectDatabase;
