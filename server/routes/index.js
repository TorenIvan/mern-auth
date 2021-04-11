const express    = require('express');
const router     = express.Router();
const path       = require('path');
const userDB     = require('../../models/User');
const validateR  = require('../../validation/register');
const validateL  = require('../../validation/login');
const bcrypt     = require('bcrypt');
const sanitize   = require('mongo-sanitize');
const mongoose   = require('mongoose');
const db         = 'mongodb://localhost/mern-auth';

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
	var data = {email, password} = req.query;
	console.log('Mpika register');
	console.log(req.query);
	/* Validate Data; return errors if exist*/
	var valData = validateR(data);
	console.log(data);
	if(!valData.isValid) return res.json({errors: valData.errors});
	console.log('Mpika meta ta validations');
	
	//Security check done in the server.js file using helmet, xss-clean, rate-limit, hpp
  	/* Although the above is correct; we need to pay attention for other attacks like nosqli */
	/* Sanitize input always */
	email    = sanitize(email);
	password = sanitize(password);

	mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
	/* Check if user with same name already exists */
  	db.collection('users').findOne({'email': email}, (err, user) => {
		console.log('Mpika');
		if(err) console.log('error during select user');
		var userExists = true;
		if(!user) userExists = false;
		else return res.json({userExists: userExists});
	});
	/* Hash password by generating the salt and then combine it with password*/
	bcrypt.genSalt(saltRounds, (err, salt) => {
		bcrypt.hash(password, salt, (err, hash) => {
			/* Insert user to db */
			console.log(hash);
			userDB.User.insertOne({email: email, password: hash}, (err) => {
				if (err) {
					console.log("Error during user insertion");
					return res.json({error: error});
				}else{
					console.log("document inserted");
				}
			});
		});
	});
	});

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
