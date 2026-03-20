// // Create Token and saving in cookie



// // const sendToken =(user,statusCode,res)=>{
// //     const token =user.getJWTToken();

// //     // options for cookie
// //     const options={
// //         expires:new Date(
// //             Date.now + process.env.COOKIE_EXPIRE * 24*60*60*1000
// //         ),
// //         httpOnly:true
// //     };

// //     res.status(statusCode).cookie("token",token,options).json({
// //         success:true,
// //         user,
// //         token,
// //     })
// // }

// // module.exports=sendToken


// const sendToken = (user, statusCode, res) => {
//     const token = user.getJWTToken();

//     // Options for cookie
//     const options = {
//         expires: new Date(
//             Date.now() + (process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000) // Corrected calculation
//         ),
//         httpOnly: true,
//         // secure: process.env.NODE_ENV === "production", // Secure cookie in production
//         // SameSite: 'Strict' // Helps prevent CSRF
//     };

//     // Prepare user data to send back (avoid sending sensitive data)
//     const userData = {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         image:user.images.url,

//     };

//     // Send response with cookie and user data
//     res.status(statusCode)
//         .cookie("token", token, options)
//         .json({
//             success: true,
//             user: userData, // Send only necessary user details
//             token
//         });
// }

// module.exports = sendToken;


// Create Token and saving in cookie



// const sendToken =(user,statusCode,res)=>{
//     const token =user.getJWTToken();

//     // options for cookie
//     const options={
//         expires:new Date(
//             Date.now + process.env.COOKIE_EXPIRE * 24*60*60*1000
//         ),
//         httpOnly:true
//     };

//     res.status(statusCode).cookie("token",token,options).json({
//         success:true,
//         user,
//         token,
//     })
// }

// module.exports=sendToken


// const sendToken = (user, statusCode, res) => {

//     const token = user.getJWTToken();

//     console.log("token kya hai",token)

//     // Options for cookie
    // const options = {
    //     expires: new Date(
    //         Date.now() + (process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000) // Corrected calculation
    //     ),
    //     httpOnly: true,
    //     // secure: process.env.NODE_ENV === "production", // Secure cookie in production
    //     // SameSite: 'Strict' // Helps prevent CSRF
    // };

//     // Prepare user data to send back (avoid sending sensitive data)
//     const userData = {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role
//     };

//     // Send response with cookie and user data
//     res.cookie("token", token, options)
//       .status(statusCode)
//       .json({
//             success: true,
//             user: userData, // Send only necessary user details
//             token
//         });
// }

// module.exports = sendToken;

// 

// const sendToken = (user, statusCode, res) => {
//     const token = user.getJWTToken();
//     console.log("TOken tha kya", token)

//     // Options for cookie
//     // const options = {
//     //     expires: new Date(
//     //         Date.now() + (process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000) // Corrected calculation
//     //     ),
//     //     httpOnly: true,
//     //     secure: process.env.NODE_ENV === "production", // Secure cookie in production
//     //     SameSite: 'Strict' // Helps prevent CSRF
//     // };

//     // const options = {
//     //     expires: new Date(Date.now() + (process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000)),
//     //     httpOnly: true,
//     //     secure: true,  // Use false for local dev (without HTTPS)
//     //     SameSite: 'Lax',  // Change from 'Strict' to 'Lax'
//     // };

const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

    const options = {
        expires: new Date(Date.now() + (process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000)),
        httpOnly: true,
        secure: false,      // Localhost ke liye false
        sameSite: 'Lax',    // Localhost ke liye 'Lax'
    };

    const userData = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    };

    res.status(statusCode)
        .cookie("token", token, options)
        .json({
            success: true,
            user: userData,
            token
        });
}

module.exports = sendToken;
