var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const Cart = require('../models/cart');
const User = require ('../models/user');

router.get('/carts', function(req, res, next) {
    Cart.find((err,items)=>{
        if(err){
          return res.json(err);
        } else {
          return res.json(items);
        }
    });
});

//korpa na osnovu userId
router.get('/carts/:id', function(req, res, next) {
  Cart.find({ user: { $eq: req.params.id }}, (err, items)=>{
      if(err){
        return res.json(err);
      } else {
        return res.json(items);
      }
  });
});

router.post('/cart',  (req, res, next) => {

  User.findById(req.body.userId, (err, user) => {
    if(err){
      return res.json(err);
    }
    else if(!user){
      return res.json({msg:"User not found!!!"});
    }

    var itemz = [];
    var niz = req.body.items;

    for(var i=0;i<niz.length;i++){
      itemz.push(niz[i].name + ', kolicina ' + niz[i].quantity + ', cena/komad: ' + niz[i].price);
    }
    var newCart = new Cart({
      user: user,
      items: itemz,
      napomena: req.body.napomena,
      date: req.body.date,
    });

    newCart.save((err, cart)=>{
      if(err)
         return res.json(err);
      else{
         user.carts.push(cart);  
         user.save();
         return res.json({msg: 'Cart added to db: '});
        }
    });

  });

});

 router.put('/cart/:id', (req, res, next)=>{
    Cart.findOneAndUpdate({_id: req.params.id}, {
       $set:{
        napomena: req.body.napomena,
        date: req.body.date,
        } 
    },
       function(err, result){
        if(err){
          res.json(err);
        }
        else
          res.json(result);
    });
  
  });
  
  router.delete('/cart/:id', (req, res, next)=>{
    Cart.remove({_id: req.params.id}, function(err, result){
      if(err){
        res.json(err);
      }
      else
        res.json(result);
      });
  });

  router.delete('/carts', (req, res, next)=>{
    Cart.remove({}, function(err, result){
      if(err){
        res.json(err);
      }
      else
        res.json(result);
      });
  });

  module.exports = router;