const express = require('express');

const routes = express.Router();


routes.get('/add-product', (req, res)=>{
    res.send(`
    <form action="/product" method = "POST">
        <input type="text" name="title" id="title">
        <button type="submit"> Submit </button>
    </form>
    `)
});

routes.post('/product',(req, res, next)=>{
    console.log(req.body);
    res.redirect('/');
});

module.exports = routes;