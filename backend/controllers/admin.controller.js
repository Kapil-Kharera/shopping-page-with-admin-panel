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

async function getUpdateProduct(req, res, next) {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);

        res.render("admin/products/updateProduct", { product: product})
    } catch (error) {
        next(error);
    }
}

function updateProduct(req, res) {}

module.exports = {
    getProducts: getProducts,
    getNewProduct: getNewProduct,
    createNewProduct: createNewProduct,
    getUpdateProduct: getUpdateProduct,
    updateProduct: updateProduct,
}