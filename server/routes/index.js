const express = require('express');
const path    = require('path');

const  router = express.Router();

router.use('/', express.static(path.resolve('../../client/publix' + '/index.html')));

module.exports = router;