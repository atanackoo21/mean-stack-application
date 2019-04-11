var mongoose = require ('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        require: true,
        default: false
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    carts: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Cart'
    }]
});

const User = module.exports = mongoose.model('User', userSchema);
