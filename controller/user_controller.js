
const User = require('../model/user');
module.exports.createUser = async function(req,res){
    
     try{
           
            //check password and conform password
         if(req.body.password !== req.body.conform_password){
            
              console.log("Password and conform password do not match");

              return res.status(400).json({
                 message:"Password  and conform does not match"
              })
         }
          //check email id already exists or not 
         let user = await User.findOne({email:req.body.email});

          // if not exists then we create new user
         if(!user){
            
             user = await User.create(req.body);
             console.log("User created:" , user);

             return res.status(200).json({
                
                message:"User created successfully",
                data:user
             })
         }else{
             // if email found then return 
             console.log("User with email id already exists");
             return res.status(400).json({
                 message:"Email already exists.please try another"
             });
         }
     }catch(err){

         console.log("Error in creating the user",err);
         return res.status(500).json({
             error:'Internal Server Error'
         })
     }

}