const jwt = require('jsonwebtoken');
const SECRET_KEY =  'my_secret_key';

const authMiddleWear = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(400).json(
            {
                status : "Unauthorized",
                message : "Invalid token"
            }
        )
    }
    const token = authHeader.split('')[1];
    try{
        const decode = jwt.verify(token,SECRET_KEY);
        req.user = decode;
        next();
    }
    catch(error){
        console.log("error:", error );
        return res.status(400).json(
            {
                status : "Unauthorized",
                message : "Invalid token"
            }
        )
    }
}
module.exports = authMiddleWear;