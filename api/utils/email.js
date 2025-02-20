const nodemailer = require("nodemailer");

exports.transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: "cade.kautzer97@ethereal.email",
    pass: "1M6VVtuDc9nn1R2qk7",
  },
  tls: {
    rejectUnauthorized: false,
  },
});
