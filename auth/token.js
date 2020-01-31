const jwt = require('jsonwebtoken');


function generate(user){
    const payload ={
        username: user.username,
        id: user.id
    };
    const options = {
        expiresIn: '1d'
    };

    return jwt.sign(payload, process.env.JWT_SECRET || 'watch your six', options)
}


module.exports = {
    generate
}