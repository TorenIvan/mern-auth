const jwt  = require('jsonwebtoken');
const user = require('../../models/User');

const generateAccessToken = (id) => {
    let token = jwt.sign({id: id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '40s'});
    console.log('Access token: ' + token);
    return token;
}

const generateRefreshToken = (id) => {
    let token = jwt.sign({id: id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '2w'});
    console.log('Refresh token: ' + token);
    return token;
}

const verifyAccessToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
    if (token === null) return res.sendStatus(401).json({unauthorized: true});

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if(error) return res.sendStatus(403).json({forbidden: true}); 
        req.user = user;
        console.log(req.user);
        next();
    });
}

const handleRefreshToken = (req, res, next) => {
    const token = req.cookies['auth-token'];
    console.log('refresh token: '+ token);
    if (token == null) return res.sendStatus(401).json({unauthorized: true});
    user.findOne({token: token}, (error, exists) => {
        if (error) throw error;
        if (!exists) return res.sendStatus(403).json({success: false, tokenExists: false});
        console.log('Mpika 1');
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
            if(error) return res.sendStatus(403).json({forbidden: true});
            console.log('Mpika 2');
            //We found the user, verified the refresh token
            let accessToken = generateAccessToken(user.id);
            return res.json({success: true, accessToken: accessToken});
        });
    });
}


module.exports = {generateAccessToken, generateRefreshToken, verifyAccessToken, handleRefreshToken}