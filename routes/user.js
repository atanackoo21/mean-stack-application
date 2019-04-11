var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const User = require ('../models/user');

router.get('/users', function(req, res, next) {
  User.find((err,users)=>{
      if(err){
        res.json();
      } else {
        res.json(users);
      }
  });
});

//pronadji admira
router.get('/useri', function(req,res,next){
  User.findOne({isAdmin: true}, function(err, user){
    if (err || !user)
      res.json(err);
    else
      res.json(user);
  });
});


router.post('/user',  (req, res, next) => {
  User.findOne({email: req.body.email}, function(err, user){
    if(err){
      return res.json({msg:'Lose'});
    }
    else if (user){
      return res.json({msg:'Ne postoji'});
    }
  });
   let newUser = new User({
     firstName: req.body.firstName,
     lastName: req.body.lastName,
     isAdmin: req.body.isAdmin,
     email: req.body.email,
     password: bcrypt.hashSync(req.body.password,10)
   });

   newUser.save((err, user)=>{
     if(err)
        return res.json(err);
     else{
          var token = jwt.sign({user: user}, 'secret', {expiresIn: 5000});
          return res.json({msg: 'Uspesno logovanje!',
                  token: token,
                  userId: user._id});
        }
   });
   
  
});

router.post('/signin', (req, res, next)=>{
  User.findOne({email: req.body.email}, function(err, user){
    if(err){
      res.json({msg:'Lose'});
    }
    else if (!user){
      res.json({msg:'Ne postoji'});
    }

    else if (!bcrypt.compareSync(req.body.password, user.password)){
      res.json({msg:'Losa lozinka'});
    }

    else{
    var token = jwt.sign({user: user}, 'secret', {expiresIn: 5000});
      res.json({msg: 'Uspesno logovanje!',
              token: token,
              userId: user._id});
    }
  });
    
});

router.delete('/user/:id', (req, res, next) => {
  User.remove({_id: req.params.id}, function(err, result){
    if(err){
      res.json(err);
    }
    else
      res.json(result);

    });
});

router.get('/user/:id', (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
  if(err){
    return res.json({msg:"Lose nesto!"});
  }
  else if(!user){
    return res.json({msg:"Nemajou ga"}    
    );
  }
  else
    return res.json({msg:"Nadjen!!!"});

  });
});


module.exports = router;
