const express  = require('express');
const router   = express.Router();
const path     = require('path');
const user     = require('../../models/User');
const bcrypt   = require('bcrypt');
const passport = require('passport');
const multer   = require('multer');

const {validateRegister, validateLogin}  = require('./validations');
const {generateAccessToken, generateRefreshToken, verifyAccessToken, handleRefreshToken}  = require('./tokens');

const saltRounds = 10;

//Set up multer for storing uploaded files
var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now())
	}
});
var upload = multer({ storage: storage });

router.use('/', express.static(path.resolve('client/public')));

router.post('/register', validateRegister, (req, res) => {
	let {email, password} = req.body;
	console.log('mpike');
	/* Check if user with same name already exists */
	user.findOne({'email': email}, (error, sameUser) => {
		if(error) return error;
		if(sameUser) return res.json({userExists: true});
		console.log('mpike');
		/* Create Hash by generating the salt and then combine it with password*/
		bcrypt.genSalt(saltRounds, (error, salt) => {
			if (error) throw error;
			bcrypt.hash(password, salt, (error, hash) => {
				if (error) throw error;
				/* Insert user to db */
				let refreshToken = generateRefreshToken(newUser.id);
				let newUser = new user({email: email, password: hash, token: refreshToken});
				newUser.save((error) => {
					if (error) return res.json({error: error});
					let accessToken = generateAccessToken(newUser.id);
					const cookieOptions = {
						httpOnly: true,
						expires: new Date(Date.now() + 7*24*60*60*1000)
					};
					res.cookie('auth-token', refreshToken);
					res.json({success: true, accessToken: accessToken});
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
			let accessToken = generateAccessToken(sameUser.id);
			let refreshToken = generateRefreshToken(sameUser.id);
			sameUser.token = refreshToken;
			sameUser.save(error => {
				if (error) return res.json({error: error});
				let cookieOptions = {
					httpOnly: true,
					expires: new Date(Date.now() + 7*24*60*60*1000),
					path: '/',
				};
				res.cookie('auth-token', refreshToken, cookieOptions);
				res.json({success: true, accessToken: accessToken});
			});
		});
	});
});

router.post('/token', handleRefreshToken);

router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
	"/auth/facebook/callback",
	passport.authenticate("facebook", {
		successRedirect: "/",
		failureRedirect: "/fail"
	})
);
  
router.get("/fail", (req, res) => {
	res.send("Failed attempt");
});

router.post('/signout', (req, res) => {
	const {user} = req;
	const cookieOptions = {
		httpOnly: true,
		expires: new Date(0),
		path: '/',
	};
	res.clearCookie('auth-token', cookieOptions);
	user.token = null;
	user.save(error => {
		if (error) throw error;
		res.sendStatus(204).json({success: true});
	});
});

router.post('/profile', verifyAccessToken, (req, res) => {
	res.json(req.user);
});

router.post('/edit', upload.single('image'), (req, res) => {
	var obj = {
        image: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: 'image/png',
        }
    }
    user.create(obj, (error, item) => {
        if (error) {
            console.log(error);
			return res.json(obj);
        }
        else {
            item.save();
            res.redirect('/');
        }
    });
});


router.post('/upload', (req, res) => {

});

/* Export router */
module.exports = router;

