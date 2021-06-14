const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'stmp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'ashishaaabro12@gmail.com',
        pass: '36\'google'
    }
});

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function (err, template) {
            if (err) {
                console.log("ERROR in rendering template", err);
                return;
            }
            mailHTML = template;
        }
    );
    return mailHTML;

}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}