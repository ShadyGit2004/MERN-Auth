const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    // host : "sandbox.smtp.mailtrap.io",
    host: "smtp-relay.brevo.com",
    port: 465,
    secure: true,   // IMPORTANT for port 465
    auth : {
        user : process.env.SMTP_USER,
        pass : process.env.SMTP_PASS,
    }
});

// Test SMTP connection
transporter.verify((error, success) => {
    if (error) {
        console.log("SMTP Verify Error:", error);
    } else {
        console.log("SMTP Verify Success:", success);
    }
});

module.exports = transporter;