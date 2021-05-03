const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    name : {
        type: String,
        trim: true, 
        default: null,
    },
    bio: [{
        type: String,
        default: '',
    }],
    phone: {
        type: Number,
        default: null,
    },
    image: { 
        data: Buffer, 
     },
     token: {
         type: String,
         default: null,
     }
});

module.exports = User = mongoose.model('users', userSchema);