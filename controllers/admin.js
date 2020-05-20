const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode){
    res.redirect('/');
  }
  const prodId = req.params.productId;

  Product.findById(prodId, (product) => {
      if(!product){
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product 
    });
  });
};

exports.postAddProduct = (req, res, next) => {
  let productDate = [
    req.body.title,
    req.body.imageUrl,
    req.body.description,
    req.body.price
    ];
  const product = new Product(null, ...productDate);
  product.save().then(()=>{
    return res.redirect('/');
  }).catch((err)=>{
    console.log(err)
  });
  
};

exports.postEditProduct = (req, res, next) => {
  let upgratDate = [
    req.body.productId,
    req.body.title,
    req.body.imageUrl,
    req.body.description,
    req.body.price
    ];
  const upgratProduct = new Product(...upgratDate);
  upgratProduct.save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};

exports.postDeleteProduct = (req, res, next) => {
   prodId = req.body.productId;
   Product.Delete(prodId);
   res.redirect('/products')
}