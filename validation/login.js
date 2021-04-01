const val = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateLogin( data ){
    let errors = {};

    //If empty make it an empty string
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    //Check email
    if (val.isEmpty(data.email)) {
        errors.email = 'Email required!';
    }else if (!val.isEmail(data.email)) {
        errors = 'Invalid Email!';
    }

    //Check password
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};