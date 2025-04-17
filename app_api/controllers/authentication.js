const passport = require('passport'); 
const mongoose = require('mongoose');
const User = require('../models/user');

const register = async(req, res) => {
    //validate message to insure that all parameters are present
    if(!req.body.name || !req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({"message": "All fields required"});
    }

    const user = new User(
        {
            name: req.body.name,    // set user name
            email: req.body.email,   //set email address
            password: ''            //start with empty passwors
        });

    user.setPassword(req.body.password)  // set password
    const q = await user.save();

    if(!q)
    {
        //Database returned no data
        return res
            .status(400)
            .json(err);

    } else {
        //Return  new user token
        const token = user.generateJWT();
        return res
            .status(200)
            .json(token);

    }
    
};

const login = (req, res) => { 
    // Validate message to ensure that email and password are present. 
    if (!req.body.email || !req.body.password) { 
      return res 
        .status(400) 
        .json({"message": "All fields required"}); 
    } 
 
    // Delegate authentication  to passport module 
    passport.authenticate('local', (err, user, info) => { 
      if (err) { 
        // Error in Authentication Process 
        return res 
          .status(404) 
          .json(err); 
      } 
       
      if (user) { // Auth succeeded - generate JWT and return to caller 
        const token = user.generateJWT(); 
        res 
          .status(200) 
          .json({token}); 
      } else { // Auth failed return error 
        res 
          .status(401) 
          .json(info); 
      } 
    })(req, res); 
};

module.exports = {
    register,
    login
}; 
 

/* 
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const register = (req, res) => {
if (!req.body.name || !req.body.email || !req.body.password) {
 return res
 .status(400)
 .json({"message": "All fields required"});
 }
const user = new User();
user.name = req.body.name;
user.email = req.body.email;
user.setPassword(req.body.password);
user.save((err) => {
 if (err) {
 res
 .status(400)
 .json(err);
 } else {
 const token = user.generateJwt();
 res
 .status(200)
 .json({token});
 }
})
};
const login = (req, res) => {
if (!req.body.email || !req.body.password) {
 return res
 .status(400)
 .json({"message": "All fields required"});
 }
passport.authenticate('local', (err, user, info) => {
 if (err) {
 return res
 .status(404)
 .json(err);
 }
 if (user) {
 const token = user.generateJwt();
 res
 .status(200)
 .json({token}); 
} else {
    res
    .status(401)
    .json(info);
    }
   })(req, res);
   };
   module.exports = {
   register,
   login
   }; */