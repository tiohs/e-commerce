const express = require('express');

const app = express();
app.use((req, res, next)=>{
    console.log('Hamilton Silva')
    next();
})
app.use((req, res)=>{
    console.log('Hamilton Silva 2')
})

app.listen('5500', ()=> console.log('http://localhost:5500/'));