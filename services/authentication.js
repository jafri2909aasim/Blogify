require('dotenv').config(); // import secret key
const JWT = require("jsonwebtoken");

const secret_key = process.env.secret_key;

function createTokeForUser(user){
    const payload = {
        _id: user._id,
        email: user.email,
        password: user.password,
        fullName: user.fullName,
        profileImageURL : user.profileImageURL
    }
    
    const token = JWT.sign(payload, secret_key);
    return token;
}

function validateToken(token){
    const payload = JWT.verify(token, secret_key);
    return payload;
}

module.exports = { createTokeForUser, validateToken };
