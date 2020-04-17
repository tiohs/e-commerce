const express = require('express');
const bodyParser = require('body-parser');

// import the Routes 
const routesAdmin = require('./routes/admin');
const routesShop = require('./routes/shop');

// Start app 

const app = express();

app.use(bodyParser.urlencoded({ extended : false })); 
app.use('/admin', routesAdmin);
app.use(routesShop);

// Error Routes 
app.use((req, res, next) => {
    res.status(404).send('<h1>Not Found the page -_-!</h1>')
})



app.listen('5500', ()=> console.log('http://localhost:5500/'));