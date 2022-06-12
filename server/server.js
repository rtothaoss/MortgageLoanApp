require('dotenv').config()
const express = require('express');
const helmet = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const moment = require('moment');
const app = express();
const db = require('./db/config');
let GridFsStorage = require('multer-gridfs-storage');
let Grid = require('gridfs-stream');
Grid.mongo = db.mongo;
let gfs = Grid(db);
let multer = require('multer');



const PORT = process.env.HOST_PORT
const HOST_NAME = process.env.HOST_NAME

// app.set('view engine', 'ejs');

//Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());


//Pull this out and put it into another file
let storage = GridFsStorage({
    gfs: gfs,

    filename: (req, file, cb) => {
        let date = Date.now();
        cb(null, file.fieldname + '-' + date + '.');
    },

    metadata: function(req, file, cb) {
        cb(null, { originalname: file.originalname });
    },
    root: 'documents'
})

let upload = multer({
    storage: storage
}).single('file')

app.post('/api/upload', (req, res) => {
    upload(req,res, (err) => {
        console.log(req.body)
        console.log(res)
        if(err) {
            res.json({error_code: 1, err_desc: err});
            return;
        }
        res.json({error_code:0, error_desc: null, file_uploaded: true})
    })
})

app.get('api/file/:filename', (req, res) => {
    gfs.collection('documents'); //set collection name to lookup into

    /** First check if file exists */
    gfs.files.find({filename: req.params.filename}).toArray(function(err, files){
        if(!files || files.length === 0){
            return res.status(404).json({
                responseCode: 1,
                responseMessage: "error"
            });
        }
        // create read stream
        var readstream = gfs.createReadStream({
            filename: files[0].filename,
            root: "documents"
        });
        // set the proper content type 
        res.set('Content-Type', files[0].contentType)
        // Return response
        return readstream.pipe(res);
    });
});
// Pull out all of the above into seperate files. middlewares/route files. this is just for testing purposes


app.get('/', (req, res) => {
    res.send('hello world')
});

app.get('/api', (req, res) => {
    res.json({msg: 'Hello from api'})
})

app.use('/api/mortgages', require('./routes/mortgage'));
app.use('/api/users', require('./routes/user'));
app.use('/api/transactions', require('./routes/transaction'));


// app.get('/api/*', (req, res) => {
//     res.send('Hello from api/whatever you want')
// })

app.listen(PORT, () => {
    console.log(`Listening at http://${HOST_NAME}:${PORT}`);
})