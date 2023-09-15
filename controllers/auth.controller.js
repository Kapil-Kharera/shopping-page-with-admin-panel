const User = require("../models/user.model");
const authUtil = require("../util/authentication");
const validationUtil = require("../util/validation");
const sessionFlash = require("../util/sessionFlash");

function getSignup(req, res) {
    let sessionData = sessionFlash.getSessionData(req);

    if(!sessionData) {
        sessionData = {
            email: "",
            confirmEmail: "",
            password: "",
            fullname: "",
            street: "",
            postal: "",
            city: ""
        }
    } 
    res.render("customer/auth/signup", { inputData: sessionData});
}

async function signUp(req, res, next) {
    const { email, password, fullname, street, postal, city } = req.body;

    const enteredData = {
        email: email,
        confirmEmail: req.body['confirm-email'],
        password: password,
        fullname: fullname,
        street: street,
        postal: postal,
        city: city
    }

    const user = new User(email, password, fullname, street, postal, city);
    
    try {
        const existsAlready = await user.existsAlready();

        if(existsAlready) {
            sessionFlash.flashDataToSession(req, {
                errorMessage:"This user already exist.",
                ...enteredData
            }, function() {
                res.redirect("/signup");
            })
            // res.redirect("/signup"); 
            return;
        }

        await user.signUp();
    } catch (error) {
        next(error);
        return;
    }

    const isDetailsValid = validationUtil.userDetailsAreValid(email, password, fullname, street, postal, city);

    const isEmailConfirmed = validationUtil.emailIsConfirmed(email, req.body['confirm-email']);

    if(!isDetailsValid || !isEmailConfirmed) {
        sessionFlash.flashDataToSession(req, {
            errorMessage: "Please check your input - Password and Postal must be 6 characters long.",
            ...enteredData
        }, function() {
            res.redirect("/signup");
        })
        // res.redirect("/signup");
        return;
    }

    res.redirect("/login");
}

function getLogin(req, res) {
    let sessionData = sessionFlash.getSessionData(req);

    if(!sessionData) {
        sessionData = {
            email: "",
            password: ""
        }
    } 
    res.render("customer/auth/login" , { inputData: sessionData });
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

    const sessionErrorData = {
        errorMessage: "Invalid Credentials - Please double check your email and password!",
        email: user.email,
        password: user.password
    }

    if(!existingUser) {
        sessionFlash.flashDataToSession(req, sessionErrorData, function() {
            res.redirect("/login");
        });
        // res.redirect("/login");
        return;
    }

    const isPasswordCorrect = await user.hasMatchingPassord(existingUser.password);

    if (!isPasswordCorrect) {
        sessionFlash.flashDataToSession(req, sessionErrorData, function() {
            res.redirect("/login");
        })
        // res.redirect("/login");
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