exports.getLogin = (req, res, nex) => {
	const isLoggedIn = req.get("Cookie").split("=")[1];
	console.log(isLoggedIn);
	res.render("auth/login", {
		pageTitle: "Login",
		path: "/login",
		editing: false,
		isAuthenticated: !!isLoggedIn,
	});
};

exports.postLogin = (req, res, nex) => {
	res.setHeader("Set-Cookie", "loggedIn=true");
	res.redirect("/");
};
