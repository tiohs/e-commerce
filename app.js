const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

// Connection URL
const url = "mongodb://localhost:27017/E-commerce";

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();
const store = new MongoDBStore({
	url: url,
	collection: "sessions",
	databaseName: "E-commerce",
});

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "img")));
app.use(
	session({
		secret: "My secret",
		resave: false,
		saveUninitialized: false,
		store: store,
	}),
);

app.use((req, res, next) => {
	if (!req.session.user) {
		return next();
	}
	User.findById(req.session.user._id)
		.then(user => {
			req.user = user;
			next();
		})
		.catch(err => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
	.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
	.then(result => {
		User.findOne().then(user => {
			if (!user) {
				const user = new User({
					name: "Hamilton Silca",
					email: "hs@hs.com",
					cart: {
						items: [],
					},
				});
				user.save();
			}
		});
		app.listen(3000);
	})
	.catch(err => {
		console.log(err);
	});
