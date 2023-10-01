const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    const token = req.headers.authorization?.slice(7); // Assuming the token is passed in the Authorization header

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized Access' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized', err, token });
        }

        req.user = decoded; // Store the decoded user information in the request object
        next();
    });
}

module.exports = verifyToken;