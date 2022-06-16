const mongoose = require('mongoose');
const {GridFsStorage} = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
Grid.mongo = mongoose.mongo;

const username = process.env.DB_USER
const password = process.env.DB_PASSWORD


const uri = `mongodb+srv://${username}:${password}@cluster0.vc0io.mongodb.net/MortgageLoanApp?retryWrites=true&w=majority`

// mongoose.createConnection(uri, (err) => {
//     if(err) throw err;
//     console.log('connected to mongodb')
// });

mongoose.connect(uri, (err) => {
    if(err) throw err;
    console.log('connected to mongodb')
});

mongoose.connection.on("error", () => {
    console.log('error occured from the database')
})

let gfs, gridFsBucket;

mongoose.connection.once('open', () => {
    // gridFsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    //     bucketName: 'documents'
    // });
    gfs = Grid(mongoose.connection.db)
    gfs.collection('documents')
    console.log('the db connection opened successfully in gridfs')
});

// let updatedMetaData;

// const updateMetadata = id => {
//   updatedMetaData = id;
//   console.log(updatedMetaData)
// }



const getGridFSFiles = id => {
   
    return new Promise((resolve, reject) => {
      gfs.files.findOne({ _id: mongoose.Types.ObjectId(id) }, (err, files) => {
        if (err) reject(err);
        // Check if files
        if (!files || files.length === 0) {
          resolve(null);
        } else {
          resolve(files);
        }
      });
    });
  };

const getAllGridFsFiles = loanNumber => {

  const filter = { metaData : loanNumber }

  return new Promise((resolve, reject) => {
    gfs.files.find({metaData : loanNumber}, (err, files) => {
      if(err) reject(err);

      if(!files || files.length === 0){
        resolve(null)
      } else {
        resolve(files)
      }

    })
  })
}

//   const createGridFSReadStream = id => {
    
//     console.log(mongoose.Types.ObjectId(id))

//     return gridFSBucket.openDownloadStream(mongoose.Types.ObjectId(id));
//   };


  const storage = new GridFsStorage({
    url: uri,
    cache: true,
    options: { useUnifiedTopology: true },
    file: (req, file) => {
      let updatedMetaData;
      
      updatedMetaData = req.headers.loannumber
     
      return new Promise(resolve => {
        const fileInfo = {
          filename: file.originalname,
          bucketName: "documents",
          metadata: updatedMetaData ? updatedMetaData : null
        };
        resolve(fileInfo);
      });
    }
  });

  storage.on("connection", () => {
    console.log('successfully accessed gridfs database')
  });

  storage.on("connectionFailed", err => {
    console.log(err.message);
  });

module.exports = mongoose;
module.exports.storage = storage;
module.exports.getGridFSFiles = getGridFSFiles;
module.exports.getAllGridFsFiles = getAllGridFsFiles;
// module.exports.updateMetadata = updateMetadata;
// module.exports.createGridFSReadStream = createGridFSReadStream;