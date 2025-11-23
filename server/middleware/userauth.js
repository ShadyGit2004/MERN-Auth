const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
    const {token} = req.cookies;

    if(!token){
        return res.json({
            success : false,
            message : "Invalid token Login again!",
        });
    };

    try {

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        
        if(decodedToken){
            if(req.body === undefined) req.body = {};
            req.body.id = decodedToken.id;      
            // req.user = { id: decodedToken.id };     
        } else {
            return res.json({
                success : false,
                message : "Not authorized. Login again!",
            });
        }

        next();

    } catch (e) {
        return res.json({
            success : false,
            message : "Auth Error - "+e.message,
        });
    };
};

module.exports = userAuth;