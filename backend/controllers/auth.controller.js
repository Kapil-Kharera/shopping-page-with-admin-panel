const User = require("../models/user.model");

function getSignup(req, res) {
    res.render("customer/auth/signup");
}

async function signUp(req, res) {
    const { email, password, fullname, street, postal, city } = req.body;
    console.log(email, password, fullname, street, postal, city);
    const user = new User(email, password, fullname, street, postal, city);
    
    await user.signUp();

    res.redirect("/login");
}

function getLogin(req, res) {
    res.render("customer/auth/login");
}

module.exports = {
    getSingup: getSignup,
    getLogin: getLogin,
    signUp: signUp
}