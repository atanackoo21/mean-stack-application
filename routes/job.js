var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const Job = require ('../models/job');

router.get('/jobs', function(req, res, next) {
  Job.find((err,users)=>{
      if(err){
        res.json();
      } else {
        res.json(users);
      }
  });
});

router.post('/job',  (req, res, next) => {
   let newJob = new Job({
     firstName: req.body.firstName,
     lastName: req.body.lastName,
     email: req.body.email,
     gender: req.body.gender,
     birth: req.body.birth,
     faculty: req.body.faculty,
     message: req.body.message,
   });

   newJob.save((err, user)=>{
     if(err)
        res.json(err);
     else
        res.json({msg: 'Job added to db: ' + user});
   });
});

router.delete('/job/:id', (req, res, next) => {
  Job.remove({_id: req.params.id}, function(err, result){
    if(err){
      return res.json(err);
    }
    else
      return res.json(result);
    });
});




router.delete('/jobs', (req, res, next)=>{
    Job.remove({}, function(err, result){
      if(err){
        res.json(err);
      }
      else
        res.json(result);
      });
  });


module.exports = router;
