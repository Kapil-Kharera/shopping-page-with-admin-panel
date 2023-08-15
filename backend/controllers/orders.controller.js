const Order = require("../models/order.model");

function addOrder(req, res) {
    const cart = res.locals.cart;


}

module.exports = {
    addOrder: addOrder,
}