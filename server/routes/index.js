const express = require('express');
const router  = express.Router();
const path    = require('path');

/* GET home page --> version 1 */
router.use('/', express.static(path.resolve('client/public')))
/* GET home page --> version 2 */
router.get('/', function(req, res) {
  res.sendFile(path.resolve('client/public/index.html'));
});

router.post('/register', (req, res) => {
  	/* Get request data using object destructuring */
	const {email, password} = req.body;
	
	//Security check done in the server.js file using helmet for xss etc
  	
	/* Check if user with same name already exists */
  	
	/* Hash password */
  	
	/* Update db */
});

router.post('/login', (req, res) => {

}); 

router.post('/signout', (req, res) => {

});

router.post('/profile', (req, res) => {

});

router.post('/edit', (req, res) => {

});

router.post('/upload', (req, res) => {

});

/* Export router */
module.exports = router;
