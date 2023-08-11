
function isEmpty(value) {
    return !value || value.trim() === "";
}

function userCredentialAreValid(email, password) {
    return (
        email && 
        email.includes("@") && 
        password && 
        password.trim().length >= 6 
    )
}

function userDetailsAreValid(email, password, name, street, postal, city) {
    return (
        userCredentialAreValid(email, password) && 
        !isEmpty(name) && 
        !isEmpty(street) &&
        !isEmpty(postal) &&
        !isEmpty(city)
    )
}

function emailIsConfirmed(email, confirmEmail) {
    return email === confirmEmail;
}

module.exports = {
    userDetailsAreValid: userDetailsAreValid,
    emailIsConfirmed: emailIsConfirmed
};