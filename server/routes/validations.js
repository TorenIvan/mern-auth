const sanitize     = require('mongo-sanitize');
const valRegister  = require('../../validation/register');
const valLogin     = require('../../validation/login');


let validateRegister = (req, res, next) => {
	var data = {email, password} = req.body;

	var valData = valRegister(data);
	if(!valData.isValid) return res.json({error: valData.error});

	req.body.email    = sanitize(email);
	req.body.password = sanitize(password);

	next();
}

let validateLogin = (req, res, next) => {
	var data = {email, password} = req.body;

	var valData = valLogin(data);
	if(!valData.isValid) return res.json({error: valData.error});

	req.body.email    = sanitize(email);
	req.body.password = sanitize(password);

	next();
}

module.exports = {validateRegister, validateLogin};