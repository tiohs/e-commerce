const express = require('express');

const routes = express.Router();

routes.get('/', (req, res, next)=> {
    res.send('Hello World !')
});

module.exports = routes;