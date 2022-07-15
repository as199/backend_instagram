const jwt = require("jsonwebtoken");
module.exports = {
    checkIsAuthenticated: (req, res, next) => {
        let token = req.get("authorization");
        if (token) {
            token = token.slice(7);
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    return  res.status(401).json({message: "Invalid token"});
                } else {
                    console.log(decoded);
                    req.decoded = decoded;
                    next();
                }
            });
        }
        else {
            return  res.status(401).json({
                message: "Access Denied! Unauthorized User"
            });
        }

    }

};