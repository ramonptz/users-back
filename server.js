const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { USERS_LIST_BD } = require('./utils/users-list-bd');
const { generateTokenOnLogin } = require('./utils/jwt-manager');

const app = express();
const PORT = 3000;

// Middleware para analisar o corpo das requisições
app.use(bodyParser.json());

// Usar o middleware cors para permitir todas as origens
app.use(cors());

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const USER_FOUND = 
        USERS_LIST_BD.find(user => user.username === username && user.password === password);

    if(!USER_FOUND) {
        return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const userToken = generateTokenOnLogin(username);

    return res.json({ token: userToken });
});

app.post('/validate-token', (req, res) => {
    const authHeader = req.headers['authorization'];

    const validToken = validateToken(authHeader);

    console.log('validateToken', validToken);

    res.json({});

});

app.listen(PORT, () => {
    console.log(`O Servidor está rodando no http://localhost:${PORT}`);
});