const nodemailer = require('nodemailer')
console.log(process.env.EMAIL_FROM,process.env.EMAIL_PASS);
const transporter = nodemailer.createTransport({
    port: process.env.NODE_ENV === 'production' ? (465): 587,     
    // service:"gmail",
    host: "smtp.gmail.com",
    secure: process.env.NODE_ENV === 'production',
    auth: {
        
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASS,
        },
    
  });

module.exports = {transporter};