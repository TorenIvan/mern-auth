const express    = require('express');
const router     = express.Router();
const path       = require('path');
const userDB     = require('../../models/User');
const validateR  = require('../../validations/register');
const validateL  = require('../../validations/login');
const bcrypt     = require('bcrypt');
const sanitize   = require('mongo-sanitize');

/* In order to generate the salt to hash the password */
const saltRounds = 10;
/* GET home page --> version 1 */
router.use('/', express.static(path.resolve('client/public')))
/* GET home page --> version 2 */
router.get('/', function(req, res) {
  res.sendFile(path.resolve('client/public/index.html'));
});

router.post('/register', (req, res) => {
  	/* Get request data using object destructuring */
	var data = {email, password} = req.body;

	/* Validate Data; return errors if exist*/
	var valData = validateR.validateRegister(data).isValid;
	if(!valData.isValid) return res.json({errors: valData.errors});
	
	//Security check done in the server.js file using helmet, xss-clean, rate-limit, hpp
  	/* Although the above is correct; we need to pay attention for other attacks like nosqli */
	/* Sanitize input always */
	email    = sanitize(email);
	password = sanitize(password);

	/* Check if user with same name already exists */
  	userDB.User.findOne({email: email}, (err, user) => {
		if(err) console.log('error during select user');
		var userExists = true;
		if(!user) userExists = false;
		else return res.json({userExists: userExists});
	})
	/* Hash password by generating the salt and the combine it with password*/
	bcrypt.genSalt(saltRounds, (err, salt) => {
		bcrypt.hash(password, salt, (err, hash) => {
			/* Insert user to db */
		})
	})
  	

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
