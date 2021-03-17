var nodemailer = require('nodemailer');

module.exports.transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '****',
    pass: '****'
  }
});

module.exports.mailOptions = {
  from: '',
  to: '',
  subject: '',
  text: ''
};
