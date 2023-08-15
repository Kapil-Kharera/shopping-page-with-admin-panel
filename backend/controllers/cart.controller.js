const Product = require("../models/product.model");

function getCartPage(req, res) {
    res.render("customer/cart/cart");
}

async function addCartItem(req, res) {
    let product;

    try {
        product = await Product.findById(req.body.productId);
    } catch (error) {
        next(error);
        return;
    }

    const cart = res.locals.cart;

    cart.addItem(product);

    req.session.cart = cart;

    res.status(201).json({
        message: "Cart Updated",
        newTotalItems: cart.totalQuantity
    });
}


function updateCartItem(req, res) {
    const cart = res.locals.cart;

    const { productId, quantity } = req.body;

    const updatedItemData = cart.updateItem(productId, +quantity);

    req.session.cart = cart;

    res.json({
        message: "Item updated",
        updatedCartData: {
            newTotalQuantity: cart.totalQuantity,
            newTotalPrice: cart.totalPrice,
            updatedItemPrice: updatedItemData.updatedItemPrice,
        }
    })
}



module.exports = {
    addCartItem: addCartItem, 
    getCartPage: getCartPage,
    updateCartItem: updateCartItem
}