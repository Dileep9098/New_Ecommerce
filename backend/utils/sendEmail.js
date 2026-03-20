const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {

    const transporter = nodeMailer.createTransport({
       
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,

        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        html: options.message,
        // html: message, // Use the HTML message here

    }

    await transporter.sendMail(mailOptions);


}

module.exports = sendEmail;




//1. install nodemailer libararay

// //2. import nodemailer
// const nodemailer = require('nodemailer');

// //3. cofigure mail and send it
// async function sendMail(){
//     //1. create an email transporter.
//     //SMTP (Simple Mail Transfer Protocol)
//    const transporter =  nodemailer.createTransport({
//         service: 'gmail',
//         auth:{
//             user: 'idealtechguru1@gmail.com',
//             pass: 'slnrhjpbuqaqpory'
//         }
//     })


//     //2.configure email content.
//     const mailOptions = {
//         from:'idealtechguru1@gmail.com',
//         to: 'apnicoding72@gmail.com',
//         subject: 'Welcome to NodeJS App',
//         text: 'This is an email using nodemail in nodejs',
//     }
``
//     //3. send email
//     try {
//        const result = await transporter.sendMail(mailOptions);
//        console.log('Eamil sent successfully')
//     } catch (error) {
//         console.log('Email send failed with error:', error)
//     }
// }

// sendMail()



// const nodeMailer = require("nodemailer");

// const sendEmail = async (options) => {
//     // Corrected environment variable names from "SMPT" to "SMTP"
//     const transporter = nodeMailer.createTransport({
//         service: process.env.SMTP_SERVICE,  // SMTP not SMPT
//         auth: {
//             user: process.env.SMTP_MAIL,    // SMTP not SMPT
//             pass: process.env.SMTP_PASSWORD,  // SMTP not SMPT
//         }
//     });

//     const mailOptions = {
//         from: process.env.SMTP_MAIL,  // SMTP not SMPT
//         to: options.email,
//         subject: options.subject,
//         text: options.message
//     };

//     try {
//         // Await the promise from sendMail to handle it properly
//         await transporter.sendMail(mailOptions);
//     } catch (error) {
//         // Handling the error
//         console.error("Failed to send email:", error);
//         throw error; // Re-throwing the error is optional and depends on how you want to handle errors further up
//     }
// }

// module.exports = sendEmail;




// const nodeMailer = require("nodemailer");

// const sendEmail = async (options) => {
//     try {
//         // Create a transporter object using the default SMTP transport
//         const transporter = nodeMailer.createTransport({
//             service: process.env.SMTP_SERVICE,  // Corrected typo here
//             auth: {
//                 user: process.env.SMTP_MAIL,  // Corrected typo here
//                 pass: process.env.SMTP_PASSWORD,  // Corrected typo here
//             }
//         });

//         // Setup email data with unicode symbols
//         const mailOptions = {
//             from: process.env.SMTP_MAIL,  // Use the email from your environment variable
//             to: options.email,  // Recipient email
//             subject: options.subject,  // Subject line
//             text: options.message,  // Plain text body
//         };

//         // Send mail with defined transport object
//         const info = await transporter.sendMail(mailOptions);

//         console.log("Message sent: %s", info.messageId);
//         return info;
//     } catch (error) {
//         console.error("Error sending email: ", error);
//         throw error;  // Optionally re-throw the error if you want calling code to handle it
//     }
// }

// module.exports = sendEmail;


// require('dotenv').config();  // Ensure you have required dotenv if you are using .env file for environment variables
// const nodeMailer = require("nodemailer");

// const sendEmail = async (options) => {
//     try {
//         const transporter = nodeMailer.createTransport({
//             service: 'gmail',  // 'gmail' as the service
//             auth: {
//                 user: process.env.SMTP_MAIL,
//                 pass: process.env.SMTP_PASSWORD,
//             }
//         });

//         const mailOptions = {
//             from: process.env.SMTP_MAIL,
//             to: options.email,
//             subject: options.subject,
//             text: options.message,
//         };

//         const info = await transporter.sendMail(mailOptions);
//         console.log("Message sent: %s", info.messageId);
//         return info;
//     } catch (error) {
//         console.error("Error sending email: ", error);
//         throw error;
//     }
// }

// module.exports = sendEmail;



// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         type: 'OAuth2',
//         user: process.env.EMAIL,
//         clientId: process.env.OAUTH_CLIENTID,
//         clientSecret: process.env.OAUTH_CLIENT_SECRET,
//         refreshToken: process.env.OAUTH_REFRESH_TOKEN,
//         accessToken: process.env.OAUTH_ACCESS_TOKEN
//     }
// });

// const mailOptions = {
//     from: process.env.EMAIL,
//     to: 'recipient@example.com',
//     subject: 'Test Email',
//     text: 'Hello from nodemailer!'
// };

// transporter.sendMail(mailOptions, function(error, info) {
//     if (error) {
//         console.log('Error sending email: ', error);
//     } else {
//         console.log('Email sent: ' + info.response);
//     }
// });
