function getSignup(req, res) {
    res.render("customer/auth/signup");
}

function signUp(req, res) {
    
}

function getLogin(req, res) {
    //logic
}

module.exports = {
    getSingup: getSignup,
    getLogin: getLogin,
    signUp: signUp
}