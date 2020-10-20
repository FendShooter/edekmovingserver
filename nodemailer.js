const nodemailer = require('nodemailer');
require('dotenv').config({path:'./config/config.env'})
const sendEmail = async (options) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SENDER_EMAIL, // generated ethereal user
      pass: process.env.SENDER_PASSWORD, // generated ethereal password
    },
    // tls: {
    //   rejectUnauthorized: false,
    // },
  });

  // send mail with defined transport object
  let message = {
    from: process.env.SENDER_EMAIL, // sender address
    to: process.env.RECEIVER_EMAIL, // list of receivers
    subject: 'Quote', // Subject line
    // text: options.message, // plain text body
    html: options.html,
  };
  // console.log(message);
  // const info = await transporter.sendMail(message);

  // console.log('Message sent: %s', info.messageId);
};

module.exports  = sendEmail;
