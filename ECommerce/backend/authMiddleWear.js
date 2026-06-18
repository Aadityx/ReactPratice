const jwt = require('jsonwebtoken');
const SECRET_KEY = "my_secret_key";

const authMiddleWear = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            status: "Unauthorized",
            message: "No token provided"
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        console.log("Token received:", token);

        const decoded = jwt.verify(token, SECRET_KEY);

        req.user = decoded;

        next();
    } catch (error) {
        console.log("error:", error);
        return res.status(401).json({
            status: "Unauthorized",
            message: "Invalid token"
        });
    }
};
module.exports = authMiddleWear;