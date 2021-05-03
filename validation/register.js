const val = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegister( data ){
    let errors = {};
    console.log('edp');
    //If empty make it an empty string
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    //Check email
    if (val.isEmpty(data.email)) {
        errors.email = 'Email required!';
    }else if (!val.isEmail(data.email)) {
        errors = 'Invalid Email!';
    }
    console.log('edp');
    //Check password
    if (val.isEmpty(data.password)) {
        errors.password = "Password required";
    }
    if (!val.isLength(data.password, { min: 7, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }
    console.log('edp');
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
