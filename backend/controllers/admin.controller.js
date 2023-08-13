const Product = require("../models/product.model");

async function getProducts(req, res, next) {
    try {
        const products = await Product.findAll();
        res.render("admin/products/allProducts", {
            products: products
        });
    } catch (error) {
        next(error);
        return;
    }
}

function getNewProduct(req, res) {

    res.render("admin/products/newProduct");
}

async function createNewProduct(req, res, next) {
    const productData = req.body;
    const filename = req.file.filename;
    
    const product = new Product({
        ...productData,
        image: filename
    });

    try {
        await product.save();
    } catch (error) {
        next(error);
        return;
    }

    res.redirect("/admin/products");
}

module.exports = {
    getProducts: getProducts,
    getNewProduct: getNewProduct,
    createNewProduct: createNewProduct
}