const nodemailer = require("nodemailer");

// Options is what we have paased in it
const sendEmail = async (options) => {

    const transporter = nodemailer.createTransport({
        host: process.env.SMPT_HOST,
        type: "SMTP",
        port: 465,
        secure:false,
        service: process.env.SMPT_SERVICE,
        auth: {
            // SMPT => Simple Mail Transfer Protocol
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    }

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;