const mongoose = require('mongoose');

const proizvodiSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    quantity: {
        type: String,
        require: true,
        default: 1
    },
    price: {
        type: Number,
        require: true
    },

    bought: {
        type: Boolean,
        require: true,
        default: false
    },
    category:{
        type: String,
        require: true,
        default: 'other'
    },
    image: {
        type: String,
        require: true,
        default: 'default.jpg'
    }
});

const Proizvodi = module.exports = mongoose.model('Proizvodi', proizvodiSchema);

