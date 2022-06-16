const express = require('express');
const router = express.Router();
const  GridFSMiddleware = require('../middlewares/gridfs-middleware');
const asyncWrapper = require('../utilities/async-wrapper');
const { getGridFSFiles, updateMetadata } = require('../db/config')
const authorize = require('../middlewares/auth')
const Document = require('../db/models/Document')

const mongoose = require('mongoose');


router.post(
    "/",
    authorize,
    
    // (req,res,next) => {
    //     // console.log(req.headers.loanNumber)
    //     updateMetadata(req.headers.loanNumber)
    //   next();
    // },
    [GridFSMiddleware()],
    asyncWrapper(async (req, res) => {
     
     
      const { originalname, mimetype, id, size, metadata  } = req.file;
      
      res.send({ originalname, mimetype, id, size, metadata })
   
      
    })
  );



  router.get(
    "/file/:id", authorize,
    asyncWrapper(async (req, res) => {
      const image = await getGridFSFiles(req.params.id);
      if (!image) {
        res.status(404).send({ message: "Image not found" });
      }
      res.setHeader("content-type", image.contentType);
 
    let bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: 'documents'
    })
    console.log(req.params.id)

    let readStream = bucket.openDownloadStream(mongoose.Types.ObjectId(req.params.id))
       
      readStream.pipe(res);
    })
  );

module.exports = router;