const Product = require('../models/product');

// Obtendo todos os produtos para o admin 
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch(err => console.log(err));
};

// Add Pordutos Pagina 
exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

// Add produto no banco de dados post 
exports.postAddProduct = (req, res, next) => {
  var title = req.body.title;
  var imageUrl = req.body.imageUrl;
  var description = req.body.description;
  var price = req.body.price;
  const product = new Product(title,price, imageUrl, description);
  product.
  save().then((r) => {
    res.redirect('/admin/products');
  }).catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode){
    res.redirect('/admin/products');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
  .then(product  => {
      if(!product){
        return res.redirect('/admin/products');
      }
      res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product 
    });
  }).catch(err => console.log(err));
};



// exports.postEditProduct = (req, res, next) => {
//   const id = req.body.productId;
//   const title = req.body.title;
//   const imageUrl = req.body.imageUrl;
//   const description = req.body.description;
//   const price = req.body.price;
//   Product.findByPk(id).then((upgratProduct) => {
//     upgratProduct.title = title;
//     upgratProduct.imageUrl = imageUrl;
//     upgratProduct.description = description;
//     upgratProduct.price = price;
//     return upgratProduct.save();
//   }).then((result)=> {
//     return res.redirect('/admin/products');
//   }).catch((err)=> console.log(err))
// };



// exports.postDeleteProduct = (req, res, next) => {
//    prodId = req.body.productId;
//    Product.findByPk(prodId).then((product)=> {
//       return product.destroy();
//    }).then((result)=> {
//     return res.redirect('/admin/products')
//    }).catch(err => console.log(err));
// }