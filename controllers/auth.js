const bcryptjs = require("bcryptjs");
const User = require("../models/user");

exports.getLogin = (req, res, nex) => {
	res.render("auth/login", {
		pageTitle: "Login",
		path: "/login",
		editing: false,
		isAuthenticated: false,
	});
};

exports.getSignup = (req, res, nex) => {
	res.render("auth/signup", {
		pageTitle: "Signup",
		path: "/signup",
		isAuthenticated: false,
	});
};

exports.postLogin = (req, res, next) => {
	User.findById("5edc58f475cca50494c98477")
		.then(user => {
			req.session.isLoggedIn = true;
			req.session.user = user;
			req.session.save(err => {
				res.redirect("/");
			});
		})
		.catch(err => console.log(err));
};

exports.postLogout = (req, res, nex) => {
	req.session.destroy(() => {
		res.redirect("/");
	});
};

exports.postSignup = (req, res, nex) => {
	const { name, email, password } = req.body;
	User.findOne({ email })
		.then(userDoc => {
			if (userDoc) {
				console.log(userDoc);
				return res.redirect("/signup");
			}
			return bcryptjs.hash(password, 12);
		})
		.then(password => {
			const user = new User({
				name,
				email,
				password,
				cart: {
					items: [],
				},
			});
			return user.save();
		})
		.then(result => {
			return res.redirect("/login");
		})
		.catch(err => console.log(err));
};
