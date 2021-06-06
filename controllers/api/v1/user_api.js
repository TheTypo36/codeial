const User = require("../../../models/user");
const jwt = require('jsonwebtoken');

module.exports.createSession = async function (req, res) {
    try {
        let user = await User.findOne({ email: req.body.email });

        if (!user || user.password != req.body.password) {
            return res.json(422, {
                message: "Invalid username/password"
            });
        }
        return res.json(200, {
            message: "Sign in successfully, here is you token keep it safely",
            data: {
                token: jwt.sign(user.toJSON(), 'codeial', { expiresIn: '1000000' })
            }
        });


    } catch (error) {
        console.log("************ERR*****", error);
        return res.json(500, {
            message: 'Internal Server ERROR'
        });
    }
}
