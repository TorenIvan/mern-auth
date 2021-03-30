const express = require('express');
const router  = express.Router();
const path    = require('path');

/* GET home page. */
router.use('/', express.static(path.resolve('client/public')))
/* OR */
router.get('/', function(req, res, next) {
  res.sendFile(path.resolve('client/public/index.html'));
});

/* Export router */
module.exports = router;