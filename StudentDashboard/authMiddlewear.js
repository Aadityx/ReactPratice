const jwt = require("jsonwebtoken");
const SECRET_KEY = 'my_secret_key';

const authMiddlewear = (req, res, next) =>{
    const authHeader = req.headers[`authorization`];
     if (!authHeader) {
        return res.status(400).json({
            status: 'Bad Request',
            message: 'No token found'
        });
    }

    let token = authHeader.split(' ')[1];

    try {

        jwt.verify(token, SECRET_KEY);

        const user = jwt.decode(token);

        console.log("Authorised User:", user);

    } catch (error) {

        console.log("Token Error:", error);

        return res.status(401).json({
            status: 'Unauthorized',
            message: 'Invalid token'
        });
    }
    next();
}
 module.exports = authMiddlewear;