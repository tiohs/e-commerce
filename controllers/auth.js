exports.getLogin = (req, res, nex) => {
	res.render("auth/login", {
		pageTitle: "Login",
		path: "/login",
		editing: false,
		isAuthenticated: req.session.isLoggedIn,
	});
};

exports.postLogin = (req, res, nex) => {
	req.session.isLoggedIn = true;
	res.setHeader("Set-Cookie", "loggedIn=true");
	res.redirect("/");
};

exports.postLogout = (req, res, nex) => {
	req.session.destroy(() => {
		res.redirect("/");
	});
};
