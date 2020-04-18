const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const rootDir = require('./util/path');

// import the Routes 
const routesAdmin = require('./routes/admin');
const routesShop = require('./routes/shop');

// Start app 

const app = express();

app.use(bodyParser.urlencoded({ extended : false })); 
app.use(express.static(path.join(__dirname, 'public')))
app.use('/admin', routesAdmin);
app.use(routesShop);

// Error Routes 
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(rootDir, 'views', '404.html'))
})



app.listen('5500', ()=> console.log('http://localhost:5500/'));