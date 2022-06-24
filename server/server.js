require('dotenv').config()
const express = require('express');
const helmet = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require("path");
const app = express();
const db = require('./db/config');


const PORT = process.env.HOST_PORT || '3000'
const HOST_NAME = process.env.HOST_NAME

// app.set('view engine', 'ejs');

//Middleware
app.use(helmet());
// app.use(cors());
// app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });
app.use(express.json());


app.use("/", express.static(path.join(__dirname, "../dist/mortgage-loan-app")));
 
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "../dist/mortgage-loan-app/index.html"));
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

// app.listen(PORT, () => {
//     console.log('app listen working');
// })



module.exports = app;