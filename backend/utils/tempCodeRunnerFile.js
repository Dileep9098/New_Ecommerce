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
        from: 'dileepsahu0873@gmail.com',
        to: options.email,
        subject: options.subject,
        html: options.message,
        // html: message, // Use the HTML message here

    }

    await transporter.sendMail(mailOptions);


}

module.exports = sendEmail;
