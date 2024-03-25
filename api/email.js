const nodemailer = require('nodemailer');

const sendCodeByEmail = async (email, code) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mvosamira@gmail.com',
            pass: 'lala',
        },
    });

    const mailOptions = {
        from: 'mvosamira@gmail.com',
        to: email,
        subject: 'Your Authentication Code',
        text: `Your authentication code is: ${code}`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

module.exports = { sendCodeByEmail };
