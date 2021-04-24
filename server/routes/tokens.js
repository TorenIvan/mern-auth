const jwt = require('jsonwebtoken');

const generateToken = (email) => {
    let token = jwt.sign({email: email}, process.env.TOKEN_SECRET, {expiresIn: '1800s'});
    console.log(token);
    return token;
}

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token === null) return res.json({unauthorized: true});

    jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
        if(error) return res.json({forbidden: true});
        req.user = user;
        console.log(req.user);
        res.json(req.user);
        next();
    });
}


module.exports = {generateToken, authenticateToken}