const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJwt = (req, res, next) => {
    const token =  req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token && token.startsWith('Bearer ')) {
        // Remove Bearer from string
        jwt.verify(token.slice(7, token.length), process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    error: 'Token is not valid'
                });
            }
            req.userId = decoded.id;
            next();
        });
    } else {
        return res.status(401).json({
            error: 'Token is not valid'
        });
    }
}
module.exports = verifyJwt;