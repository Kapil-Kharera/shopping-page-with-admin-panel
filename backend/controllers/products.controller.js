const Product = require("../models/product.model");

async function getAllProducts(req, res, next) {

    try {
        const products = await Product.findAll();
        res.render("customer/products/allProducts", {products: products});
    } catch (error) {
        next(error);
    }

}

module.exports = {
    getAllProducts: getAllProducts,
}