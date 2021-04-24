const express      = require('express');
const router       = express.Router();
const path         = require('path');
const user         = require('../../models/User');
const valRegister  = require('../../validation/register');
const valLogin     = require('../../validation/login');
const bcrypt       = require('bcrypt');
const sanitize     = require('mongo-sanitize');

/* In order to generate the salt to hash the password */
const saltRounds = 10;
/* GET home page --> version 1 */
router.use('/', express.static(path.resolve('client/public')))
/* GET home page --> version 2 */
router.get('/', function(req, res) {
  res.sendFile(path.resolve('client/public/index.html'));
});

router.post('/register', async (req, res) => {
	var data = {email, password} = req.body;

	var valData = valRegister(data);
	if(!valData.isValid) return res.json({error: valData.error});
	
	email    = sanitize(email);
	password = sanitize(password);

	/* Check if user with same name already exists */
	user.findOne({'email': email}, (error, sameUser) => {
		if(error) return error;
		if(sameUser) return res.json({userExists: true});
	
		/* Hash password by generating the salt and then combine it with password*/
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

