const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
	res.render("admin/edit-product", {
		pageTitle: "Add Product",
		path: "/admin/add-product",
		editing: false,
		isAuthenticated: req.isLoggedIn,
	});
};

exports.postAddProduct = (req, res, next) => {
	const { title, imageUrl, price, description } = req.body;
	const userId = req.user;
	const product = new Product({
		title,
		price,
		description,
		imageUrl,
		userId,
	});
	product
		.save()
		.then(result => {
			res.redirect("/admin/products");
		})
		.catch(err => {
			console.log(err);
		});
};

exports.getEditProduct = (req, res, next) => {
	const editMode = req.query.edit;
	if (!editMode) {
		return res.redirect("/");
	}
	const prodId = req.params.productId;
	Product.findById(prodId)
		// Product.findById(prodId)
		.then(product => {
			if (!product) {
				return res.redirect("/");
			}
			res.render("admin/edit-product", {
				pageTitle: "Edit Product",
				path: "/admin/edit-product",
				editing: editMode,
				product: product,
				isAuthenticated: req.isLoggedIn,
			});
		})
		.catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
	const prodId = req.body.productId;
	const updatedTitle = req.body.title;
	const updatedPrice = req.body.price;
	const updatedImageUrl = req.body.imageUrl;
	const updatedDesc = req.body.description;

	const product = new Product(
		updatedTitle,
		updatedPrice,
		updatedDesc,
		updatedImageUrl,
		prodId,
	);
	product
		.save()
		.then(result => {
			console.log(result);
			res.redirect("/admin/products");
		})
		.catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
	Product.find()
		.exec()
		.then(products => {
			res.render("admin/products", {
				prods: products,
				pageTitle: "Admin Products",
				path: "/admin/products",
				isAuthenticated: req.isLoggedIn,
			});
		})
		.catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
	const prodId = req.body.productId;
	Product.findByIdAndDelete(prodId)
		.then(() => {
			res.redirect("/admin/products");
		})
		.catch(err => console.log(err));
};
