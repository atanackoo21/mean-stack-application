var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const Proizvodi = require('../models/proizvodi');
const Item = require('../models/shoppingItem');
const User = require ('../models/user');

//proizvodi iz korpe
router.get('/proizvodi', function(req, res, next) {
  Proizvodi.find((err,items)=>{
        if(err){
          res.json();
        } else {
          res.json(items);
        }
    });
});

//pronadji proizvod ako ga ima vec u korpi
router.get('/proizvod/:id', function(req,res,next){
  Proizvodi.findById(req.params.id, function(err, item){
    if (!item || err)
      return res.json({msg: 'Not found'});
    else
      return res.json({msg: 'Found'});
  });
});

//dodaj u korpu
router.post('/proizvod',  (req, res, next) => {
    let newItemInChart = new Proizvodi({
      _id: req.body._id,
      name: req.body.name,
      bought: req.body.bought,
      quantity: req.body.quantity,
      price: req.body.price,
    });
 
    newItemInChart.save((err, item)=>{
      if(err)
         res.json(err);
      else
         res.json({msg: 'Item added to cart:' + item});
    });
});

//izbrisi iz korpe
  router.delete('/proizvod/:id', (req, res, next)=>{
    Proizvodi.remove({_id: req.params.id}, function(err, result){
      if(err){
        res.json(err);
      }
      else
        res.json(result);
      });
  });

  router.delete('/proizvodi', (req, res, next)=>{
    Proizvodi.remove({}, function(err, result){
      if(err){
        res.json(err);
      }
      else
        res.json(result);
      });
  });

 router.put('/proizvod/:id', (req, res, next)=>{
  Proizvodi.findOneAndUpdate({_id: req.params.id}, {
       $set:{
        quantity: req.body.quantity ,
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
  

  
  module.exports = router;