function getSignup(req, res) {
    res.render("customer/auth/signup");
}

function getLogin(req, res) {
    //logic
}

module.exports = {
    getSingup: getSignup,
    getLogin: getLogin
}