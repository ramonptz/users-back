const jwt = require('jsonwebtoken');

const SECRET_KEY = 'CURSO_ANGULAR';

const generateTokenOnLogin = (username) => {
    return jwt.sign({ username }, SECRET_KEY, { expiresIn: 300 });
};

const validateToken = (username) => {
    let TOKEN_IS_VALID = false;

    try {
        if(!token){
            throw new Error('Token not provided');
        }

        jwt.verify(token, SECRET_KEY);

        TOKEN_IS_VALID = true;
        
    } catch (error) {
        TOKEN_IS_VALID = false;
    }
}

module.exports = { generateTokenOnLogin };
