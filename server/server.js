require('dotenv').config()
const express = require('express');
const helmet = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const db = require('./db/config');


const PORT = process.env.HOST_PORT || '3000'
const HOST_NAME = process.env.HOST_NAME

// app.set('view engine', 'ejs');

//Middleware
app.use(helmet());
// app.use(cors());
app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
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
app.use('/api/documents', require('./routes/documents'));


// app.get('/api/*', (req, res) => {
//     res.send('Hello from api/whatever you want')
// })

app.listen(PORT, () => {
    console.log('app listen working');
})