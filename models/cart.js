var mongoose = require ('mongoose');
var User = require('./user');
var Proizvodi = require ('./proizvodi');
var Item = require('./shoppingItem');
var Schema = mongoose.Schema;

var cartSchema = new Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    // svaku korpu odlikuje samo 1 korisnik!
    items: [{
        type: String,
        require:true
    }],
    napomena:{
        type: String,
        require: false
    },
    date: {
        type: String, 
        require: true
    }
});

const Cart = module.exports = mongoose.model('Cart', cartSchema);