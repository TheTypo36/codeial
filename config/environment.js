
const development = {
    name: "development",
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    stmp: {
        service: 'gmail',
        host: 'stmp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'thetypo36@gmail.com',
            pass: '36\'ashish'
        }
    },
    google_client_id: "271640629293-naecr2oph8jk7g5jebktsn138gbuv7jg.apps.googleusercontent.com",
    google_client_secret: "7KJLAHa4rE7u88QFgl44-J6k",
    google_call_back_url: "http://localhost:7000/user/auth/google/callback",
    jwt_secret: 'codeial',
}

const production = {
    name: 'production',
}


module.exports = development;