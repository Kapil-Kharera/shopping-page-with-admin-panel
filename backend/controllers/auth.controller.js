const User = require("../models/user.model");
const authUtil = require("../util/authentication");

function getSignup(req, res) {
    res.render("customer/auth/signup");
}

async function signUp(req, res) {
    const { email, password, fullname, street, postal, city } = req.body;
    const user = new User(email, password, fullname, street, postal, city);
    
    await user.signUp();

    res.redirect("/login");
}

function getLogin(req, res) {
    res.render("customer/auth/login");
}

async function login(req, res) {
    const { email, password } = req.body;

    const user = new User(email, password);

    const existingUser = await user.getUserWithSameEmail();

    if(!existingUser) {
        res.redirect("/login");
        return;
    }

    const isPasswordCorrect = await user.hasMatchingPassord(existingUser.password);

    if (!isPasswordCorrect) {
        res.redirect("/login");
        return;
    }

    authUtil.createUserSession(req, existingUser, function() {
        res.redirect("/");
    })

}

module.exports = {
    getSingup: getSignup,
    getLogin: getLogin,
    signUp: signUp,
    login: login
}