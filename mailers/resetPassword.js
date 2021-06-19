const nodeMailer = require('../config/nodemailer');

exports.resetPassword = (resetPasswordToken) => {
    console.log('inside resetPassword', resetPasswordToken);
    let htmlString = nodeMailer.renderTemplate({ resetPasswordToken: resetPasswordToken }, '/resetPassword/reset_password.ejs');
    nodeMailer.transporter.sendMail({

        from: 'codial',
        to: resetPasswordToken.user.email,
        subject: "Reset Password",
        html: htmlString
    }, (err, info) => {
        if (err) {
            console.log('error in sending mail', err);
            return;
        }
        console.log('Mail delivered', info);
        return;
    });
}