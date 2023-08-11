const User = require("../models/user.model");
const authUtil = require("../util/authentication");
const validationUtil = require("../util/validation");

function getSignup(req, res) {
    res.render("customer/auth/signup");
}

async function signUp(req, res, next) {
    const { email, password, fullname, street, postal, city } = req.body;

    const isDetailsValid = validationUtil.userDetailsAreValid(email, password, fullname, street, postal, city);

    const isEmailConfirmed = validationUtil.emailIsConfirmed(email, req.body['confirm-email']);

    if(!isDetailsValid || !isEmailConfirmed) {
        res.redirect("/signup");
        return;
    }

    const user = new User(email, password, fullname, street, postal, city);

    
    try {
        const existsAlready = await user.existsAlready();

        if(existsAlready) {
            res.redirect("/signup") 
            return;
        }

        await user.signUp();
    } catch (error) {
        next(error);
        return;
    }

    res.redirect("/login");
}

function getLogin(req, res) {
    res.render("customer/auth/login");
}

async function login(req, res, next) {
    const { email, password } = req.body;

    const user = new User(email, password);

    let existingUser;

    try {
        existingUser = await user.getUserWithSameEmail();
    } catch (error) {
        next(error);
        return;
    }

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

function logout(req, res) {
    authUtil.destroyUserAuthSession(req);
    res.redirect("/login");
}

module.exports = {
    getSingup: getSignup,
    getLogin: getLogin,
    signUp: signUp,
    login: login,
    logout: logout
}