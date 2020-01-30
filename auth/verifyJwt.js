const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET || 'watch your six', (err, decodedToken) => {
            if(err) {
                console.log(err)
                res.status(401).json({ message: 'Token not valid'})
            } else {
                console.log('Valid token')
                req.user = decodedToken;
                next();
            }
        })
    } else {
        res.status(401).json({ you: 'shall not pass!'})
    }
}