const express = require('express');
const app = express();
const port = 8000;

//use express router
app.use('/', require('./routes/index.js'));

app.listen(port, function (err) {
    if (err) {
        console.log(`error in running the server: ${err}`);
        return;
    }
    console.log(`The server is up and running on the port: ${port}`);
});