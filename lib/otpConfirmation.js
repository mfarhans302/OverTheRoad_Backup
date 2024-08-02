const nodemailer = require("nodemailer");
const { convert } = require("html-to-text");

const sendOtpEmail = (options) =>
  new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVICE,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const text = convert(options.html, {
      wordwrap: 130,
    });

    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: options.email,
      subject: options.subject,
      text,
      html: options.html,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return reject(error);
      }

      console.log("Info ", info);
      console.log("Message id ", info.messageId);
      console.log("Preview URL ", nodemailer.getTestMessageUrl(info));

      return resolve(info);
    });
  });

module.exports = sendOtpEmail;