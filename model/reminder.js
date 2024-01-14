
const mongoose =require('mongoose');

const reminderSchema = new mongoose.Schema({
     
      userID : {
        
           type:mongoose.Schema.Types.ObjectId,
           ref:'User',
           required:true,
      },
      scheduleType :{
         type:String,
         required:true,
      },
      scheduleTime:{
          type:Date,
          required:true,
      }
});

const Reminder = mongoose.model('Reminder',reminderSchema);

module.exports = Reminder;