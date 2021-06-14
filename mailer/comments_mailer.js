const nodeMailer = require('../config/nodemailer');
exports.newComment = (comment) => {
    let htmlString = nodeMailer.renderTemplate({ comment: comment }, '/comments/new_comment.ejs');
    console.log('inside new comment mailer');
    nodeMailer.transporter.sendMail({
        from: 'thetypo36@gmail.com',
        to: comment.user.email,
        subject: "New Comment Published",
        html: htmlString
    }, (error, info) => {
        if (error) {
            console.log('ERROR in sending the email', error);
            return;
        }
        console.log('Message sent', info);
        return;
    });
}