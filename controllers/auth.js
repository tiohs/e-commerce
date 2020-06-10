const User = require("../models/user");

exports.getLogin = (req, res, nex) => {
	res.render("auth/login", {
		pageTitle: "Login",
		path: "/login",
		editing: false,
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
