const express = require('express');
const router  = express.Router();
const path    = require('path');

/* GET home page --> version 1 */
router.use('/', express.static(path.resolve('client/public')))
/* GET home page --> version 2 */
router.get('/', function(req, res, next) {
  res.sendFile(path.resolve('client/public/index.html'));
});

router.post('/register', (req, res, next) => {
  /* Security check */
  /* Check if user with same name already exists */
  /* Hash password */
  /* Update db */
});

router.post('/login', (req, res, next) => {

});

router.post('/signout', (req, res, next) => {

});

router.post('/profile', (req, res, next) => {

});

router.post('/edit', (req, res, next) => {

});

router.post('/upload', (req, res, next) => {

});

/* Export router */
module.exports = router;