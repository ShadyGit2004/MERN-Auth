// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//     // host : "sandbox.smtp.mailtrap.io",
//     host: "smtp-relay.brevo.com",
//     port: 465,
//     secure: false,
//     auth : {
//         user : process.env.SMTP_USER,
//         pass : process.env.SMTP_PASS,
//     },
//     tls: {
//         rejectUnauthorized: false, // avoids cert issues on Render
//     },
// });

// // Test SMTP connection
// transporter.verify((error, success) => {
//     if (error) {
//         console.log("SMTP Verify Error:", error);
//     } else {
//         console.log("SMTP Verify Success:", success);
//     }
// });

// module.exports = transporter;


const { TransactionalEmailsApi } = require("@getbrevo/brevo");
const brevoClient = new TransactionalEmailsApi();
brevoClient.authentications.apiKey.apiKey = process.env.BREVO_API_KEY;

module.exports = brevoClient;