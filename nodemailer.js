const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
      user: process.env.SG_USERNAME,
      pass: process.env.SG_API_KEY,
    },
  });
  const mailOptions = {
    from: process.env.SENDER,
    to: options.to,
    suject: 'New quote',
    text: options.message,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmail;
