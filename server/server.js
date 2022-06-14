require('dotenv').config()
const express = require('express');
const helmet = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const moment = require('moment');
const app = express();
const db = require('./db/config');


const PORT = process.env.HOST_PORT
const HOST_NAME = process.env.HOST_NAME

// app.set('view engine', 'ejs');

//Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());




app.get('/', (req, res) => {
    res.send('hello world')
});

app.get('/api', (req, res) => {
    res.json({msg: 'Hello from api'})
})

app.use('/api/mortgages', require('./routes/mortgage'));
app.use('/api/users', require('./routes/user'));
app.use('/api/transactions', require('./routes/transaction'));
app.use('/api/upload', require('./routes/documents'));


// app.get('/api/*', (req, res) => {
//     res.send('Hello from api/whatever you want')
// })

app.listen(PORT, () => {
    console.log(`Listening at http://${HOST_NAME}:${PORT}`);
})