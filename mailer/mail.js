  var nodemailer = require('nodemailer');

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'shailendra964@gmail.com', // generated ethereal user
            pass: '9825930226' // generated ethereal password
        },
        tls:{
            rejectUnauthorized:false
        }
    });


module.exports = transporter;