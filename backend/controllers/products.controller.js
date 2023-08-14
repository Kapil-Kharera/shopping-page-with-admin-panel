const Product = require("../models/product.model");

async function getAllProducts(req, res, next) {

    try {
        const products = await Product.findAll();
        res.render("customer/products/allProducts", {products: products});
    } catch (error) {
        next(error);
    }

}

async function getProductDetails(req, res, next) {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        res.render("customer/products/productDetails", { product: product})
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllProducts: getAllProducts,
    getProductDetails: getProductDetails,
}