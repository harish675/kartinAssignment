
const password = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../model/user');
const passport = require('passport');

//authentication using passport

passport.use(new localStrategy({
    
     usernameField:'email',
     passReqToCallback:true
},
 function(req,email,password,done){
    
     //find user and establish the identity

     User.findOne({email:email})
     .then((user)=>{
        
        if(!user || user.password != password){
             console.log('Error Invalid Username/ Password');
             return done(null,false);
        }

        return done(null,user);
     })
     .catch((err)=>{
        
         console.log(err);
          return done(err);
     })
 }

))

//serializing to user decide which key is to kept in cookie

passport.serializeUser(function(user,done){
    
     return done(null,user.id);

});

passport.deserializeUser(function(id,done){
    
     User.findById(id)
     .then((user)=>{
        
         return done(null,user);

     }).catch((err)=>{
          console.log("error in finding user --->passport");
          return done(err);
     })

})

//check  the user is authenticated 

passport.checkAuthentication = function(req,res,next){
    
     // if user is signed in ,then pass on the req to next function which controller next
     if(req.isAuthenticated()){
          return next();
     }
     //user not sign
     //return to user sign page
     return res.redirect('back');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
         //req.user contains the current signed in user from the session cookie we just
         //sending this to the locals for the views

         req.locals.user = req.user;
    }
    next();
}