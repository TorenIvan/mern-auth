const express = require('express');
const router  = express.Router();
const path    = require('path');

/* GET home page --> version 1 */
router.use('/', express.static(path.resolve('client/public')))
/* GET home page --> version 2 */
router.get('/', function(req, res, next) {
  res.sendFile(path.resolve('client/public/index.html'));
});

/* Export router */
module.exports = router;