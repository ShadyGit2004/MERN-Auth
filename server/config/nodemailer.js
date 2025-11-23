const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    // host : "sandbox.smtp.mailtrap.io",
    host: "smtp-relay.brevo.com",
    port : 587,
    auth : {
        user : process.env.SMTP_USER,
        pass : process.env.SMTP_PASS,
    }
});

module.exports = transporter;