const { validateToken } = require("../utils/jwt-manager");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; // "Bearer token"
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
        return res.status(401).json({message: 'Token not provided.'});
    }

    // const TOKEN_IS_VALID = validateToken(token);
    const TOKEN_DECODED = validateToken(token);

    if(!TOKEN_DECODED) {
        console.log("Token inválido");
        return res.sendStatus(403).json({message: 'Token not valid ou expired.'});;
    }

    req.username = TOKEN_DECODED.username;

    next();
};

module.exports = { authenticateToken };