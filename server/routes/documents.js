const express = require('express');
const router = express.Router();
const  GridFSMiddleware = require('../middlewares/gridfs-middleware');
const asyncWrapper = require('../utilities/async-wrapper');


router.post(
    "/",
    [GridFSMiddleware()],
    asyncWrapper(async (req, res) => {
      const { originalname, mimetype, id, size } = req.file;
      res.send({ originalname, mimetype, id, size });
    })
  );

router.get('/', (req, res, next) => {
    res.json('it worked')
    })

module.exports = router;