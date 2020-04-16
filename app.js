const express = require('express');
const bodyParser = require('body-parser');

// import the Routes 
const routesAdmin = require('./routes/admin');
const routesShop = require('./routes/shop');

// Start app 

const app = express();

app.use(bodyParser.urlencoded({ extended : false })); 
app.use(routesAdmin);
app.use(routesShop);




app.listen('5500', ()=> console.log('http://localhost:5500/'));