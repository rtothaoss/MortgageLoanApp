const express = require('express');
const app = express();
require('dotenv').config()

const PORT = process.env.HOST_PORT
const HOST_NAME = process.env.HOST_NAME


app.get('/', (req, res) => {
    res.send('hello world')
});

app.listen(PORT, () => {
    console.log(`Listening at http://${HOST_NAME}:${PORT}`);
})