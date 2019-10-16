const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header('x-webtoken');
    if (!token) return res.status(401).send("No token");
    
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.user = decodedToken;
        next();
    } catch (e) {
        res.status(400).send("Invalid Token");
    }
};