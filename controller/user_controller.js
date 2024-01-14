
const User = require('../model/user');
const Reminder = require('../model/reminder');
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

//create session.
module.exports.createSession = function (req,res){

       
     console.log("user signed successfully");

     const user = req.user;

      return res.redirect('/user/profile');

    //  return res.status(200).json({
        
    //      message:"User login successfully",
    //      data:user
    //  })

}

//destroy session 

module.exports.destroySession = function(req,res){
    
     req.logout(function(err){
         
          if(err){
             return next(err);
          }
           return redirect('/');
     })

}

//user profile 

module.exports.profilePage = function(req,res){
    
    if(req.isAuthenticated()){    
        //finding the tasks list and showing in the user profile 
      return  res.render('profile',{
            title:'Profile',
            user: req.user, 
        });

    }
    else{
        
         return res.redirect('back');

    }
   

}


//schedule reminder for specific type

// module.exports.scheduleReminder = async function(req,res){
    
//      try{
         
//          const userId = req.params.userId;
//          const scheduleType = req.body.scheduleType;
//          const newScheduleTime = req.body.newScheduleTime;

//          //validate schedule type

//          const validScheduleTypes = ['exercise','breakfast','lunch','dinner','meditation'];
         
//          if(!validScheduleTypes.includes(scheduleType)){
            
//              return res.status(400).json({
                
//                  message:'Invalid Schedule type'
//              })
//          }
//          //find the user by ID and update specific schedule
//          const updatedUser = await User.findByIdAndUpdate(
//                userId,
//                {[scheduleType]:newScheduleTime},
//                {new:true}
//          );


//          if(!updatedUser){
            
//             return res.status(404).json({
//                   message:"User not Found"
//             });

//          }

//          const userProfile = {
//             name:updatedUser.name,
//             lastName:updatedUser.lastName,
//             email:updatedUser.email,
//             exerciseTime: updatedUser.exerciseTime,
//             breakfastTime:updatedUser.breakfastTime,
//             lunchTime:updatedUser.lunchTime,
//             dinnerTime:updatedUser.dinnerTime,
//             meditationTime:updatedUser.meditationTime,
//          };

//          res.json({
//             message:`Schedule ${scheduleType} reminder successfully`,
//             user:userProfile 
//          });
//      }
//      catch(error){
         
//          console.error(error);
//          res.status(500).json({
            
//              message:'Internal Server error'

//          });
         
//      }
// }


// Schedule reminder for a specific type
module.exports.scheduleReminder = async function (req, res) {
    try {

      console.log("this function is called");
      console.log(req.body);
      const userId = req.params.id;
      const scheduleType = req.body.scheduleType;
      const newScheduleTime = req.body.newScheduleTime;

      console.log(req.body.scheduleType);
      console.log(req.body.newScheduleTime);
  
      //Validate schedule type
      const validScheduleTypes = ['exerciseTime', 'breakfastTime', 'lunchTime', 'dinnerTime', 'meditationTime'];
  
      if (!validScheduleTypes.includes(scheduleType)) {
        return res.status(400).json({
          message: 'Invalid Schedule type',
        });
      }
  
      // Find the user by ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({
          message: 'User not found',
        });
      }
  
      // Update specific schedule or set default value
      user[scheduleType] = newScheduleTime || user[scheduleType] || User.schema.paths[scheduleType].defaultValue;
  
      // Save the updated user
      const updatedUser = await user.save();
  
      console.log("User updated successfully", updatedUser);

   // Schedule the reminder
    const scheduledTime = new Date(newScheduleTime);
    const reminder = await Reminder.create({
      userId: user._id,
      scheduleType,
      scheduledTime,
    });

    console.log(`Reminder scheduled for user ${userId} at ${scheduledTime}`);

  
      const userProfile = {
        name: updatedUser.name,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        exerciseTime: updatedUser.exerciseTime,
        breakfastTime: updatedUser.breakfastTime,
        lunchTime: updatedUser.lunchTime,
        dinnerTime: updatedUser.dinnerTime,
        meditationTime: updatedUser.meditationTime,
      };
  
      res.json({
        message: `Schedule ${scheduleType} reminder successfully`,
        user: userProfile,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal Server error',
      });
    }
  };


  // Retrieve reminders for a specific user
module.exports.getReminders = async function (req, res) {
  try {
    const userId = req.params.id;

    // Find reminders for the user
    const reminders = await Reminder.find({ userId });

    res.json({
      message: 'Reminders retrieved successfully',
      reminders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server error',
    });
  }
}
  