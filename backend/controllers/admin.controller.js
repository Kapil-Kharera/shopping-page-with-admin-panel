function getProducts(req, res) {
    res.render("admin/products/allProducts");
}

function getNewProduct(req, res) {
    res.render("admin/products/newProduct");
}

function createNewProduct() {

}

module.exports = {
    getProducts: getProducts,
    getNewProduct: getNewProduct,
    createNewProduct: createNewProduct
}