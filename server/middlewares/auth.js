const jwt = require("jsonwebtoken");

const PUBLIC_TOKEN = process.env.PUBLIC_KEY.replace(/\\n/g, '\n')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, PUBLIC_TOKEN);
        
        next();
    } catch (error) {
        res.status(401).json({ message: "No token provided" });
    }
};