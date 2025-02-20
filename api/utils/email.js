const nodemailer = require("nodemailer");

exports.transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODE_MAIL,
    pass: process.env.NODE_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
