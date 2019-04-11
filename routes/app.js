var express = require('express');
var router = express.Router();

const Item = require ('../models/shoppingItem');

router.get('/items', function(req, res, next) {
  Item.find((err,items)=>{
      if(err){
        res.json();
      } else {
        res.json(items);
      }
  });
});

router.get('/item/:id', function(req, res, next) {
  Item.findOne({_id: req.params.id}, (err,item)=>{
      if(err || !item){
        return res.json("lose");
      } else {
        return res.json(item);
      }
  });
});

router.post('/item',  (req, res, next) => {
   let newShoppingItem = new Item({
     name: req.body.name,
     quantity: req.body.quantity,
     price: req.body.price,
     bought: req.body.bought,
     category: req.body.category,
     image: req.body.image
   });

   newShoppingItem.save((err, item)=>{
     if(err)
        res.json(err);
     else
        res.json({msg: 'Item added to db :' + item});
   });
});


router.put('/item/:id', (req, res, next)=>{
  Item.findOneAndUpdate({_id: req.params.id}, {
     $set:{
      name: req.body.name,
      quantity: req.body.quantity,
      bought: req.body.bought,
      category: req.body.category,
      image: req.body.image 
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

router.delete('/item/:id', (req, res, next)=>{
  Item.remove({_id: req.params.id}, function(err, result){
    if(err){
      res.json(err);
    }
    else
      res.json(result);

    });
});

module.exports = router;
