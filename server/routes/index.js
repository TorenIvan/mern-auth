const express = require('express');
const router  = express.Router();
const path    = require('path');
const user    = require('../../models/User');
const bcrypt  = require('bcrypt');
const {validateRegister, validateLogin}  = require('./validations');
const {generateToken, authenticateToken}  = require('./tokens');

/* In order to generate the salt to hash the password */
const saltRounds = 10;

router.use('/', express.static(path.resolve('client/public')));

router.post('/register', validateRegister, (req, res) => {
	let {email, password} = req.body;

	/* Check if user with same name already exists */
	user.findOne({'email': email}, (error, sameUser) => {
		if(error) return error;
		if(sameUser) return res.json({userExists: true});
	
		/* Create Hash by generating the salt and then combine it with password*/
		bcrypt.genSalt(saltRounds, (error, salt) => {
			if (error) throw error;
			bcrypt.hash(password, salt, (error, hash) => {
				if (error) throw error;
				/* Insert user to db */
				let newUser = new user({email: email, password: hash});
				newUser.save((error) => {
					if (error) return res.json({error: error});
					res.json(newUser);
				});
			});
		});
	});
});

router.post('/login', validateLogin, (req, res) => {
	let {email, password} = req.body;

	/* Check if user with same name already exists */
	user.findOne({'email': email}, (error, sameUser) => {
		if(error) return error;
		if(!sameUser) return res.json({userExists: false});
	
		/* Compare passwords using hash collision functionality */
		bcrypt.compare(password, sameUser.password, (error, result) => {
			if (error) throw error;
			if (result == false) return res.json({password: false});
			/* Password is Correct */
			generateToken(email);
			res.json({redirect: '/profile'});
		});
	});
});

router.post('/signout', (req, res) => {

});

router.post('/profile', authenticateToken, (req, res) => {
	console.log('Mpika profile');
});

router.post('/edit', (req, res) => {

});

router.post('/upload', (req, res) => {

});

/* Export router */
module.exports = router;

