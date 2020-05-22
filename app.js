const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const sequelise = require('./util/db');
const User = require('./models/user');
const Product = require('./models/product');

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'img')));

app.use((req, res, next)=> {
    User.findByPk(1).then((user) => {
        
        req.user = user;
        next();
    }).catch((err) => {
        console.log(err)
    });
});
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, {constraints : true, onDelete : 'CASCADE'});
User.hasMany(Product);

sequelise.sync().then((result) => {    
    return User.findByPk(1); 
}).then((user) => {
    app.listen(3000, () => {console.log('http://localhost:3000/');});
    if(!user){
        return User.create({
            name : 'Hamilton Silva',
            email : 'test@test.com'
        });
    }
    return Promise.resolve(user);
}).catch(error => console.log(error));

