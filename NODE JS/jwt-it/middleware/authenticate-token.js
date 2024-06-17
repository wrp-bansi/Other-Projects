
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

function authenticateToken(req,res,next){
const token=req.headers['authorization'];
if (!token) {
    return res.status(401).json({ message: 'Access denied. Token is required.' });
}


jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
        return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = decoded;
    next();
});

}


module.exports={authenticateToken}