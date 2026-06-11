const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json(
            {
                status: 'Unauthorized',
                message: 'Access denied'
            }
        );
    }
    let jwtToken = authHeader.replace('Bearer ', '');
    try {
        jwt.verify(jwtToken, SECRET_KEY);
        let user = jwt.decode(jwtToken);
        console.log("Authenticated user:", user);
    } catch (err) {
        console.log("Token verification failed:", err);
        return res.status(401).json(
            {
                status: 'Unauthorized',
                message: 'Invalid token'
            }
        );
    }
    next();
};

module.exports = authMiddleware;
