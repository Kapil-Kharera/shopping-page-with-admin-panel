function getProducts(req, res) {
    res.render("admin/products/allProducts");
}

function getNewProduct(req, res) {
    res.render("admin/products/newProduct");
}

function createNewProduct(req, res) {
    console.log(req.body);
    console.log(req.file);

    res.redirect("/admin/products");
}

module.exports = {
    getProducts: getProducts,
    getNewProduct: getNewProduct,
    createNewProduct: createNewProduct
}