const { response } = require("express");

console.log('Script is loading....');

document.addEventListener('DOMContentLoaded',()=>{
     loadUserProfile();
});

function loadUserProfile(){
    
     const userProfile = {
        
        userName :'example User',
        exerciseTime : '8.00 AM',
        breakfastTime :'9.00 AM',
        lunchTime : '12.30 PM',
        dinnerTime :'06:00 PM',
        meditationTime : '07;30 PM',
     };
//display user  profile details 
const userProfileDiv = document.getElementById('userProfile');
userProfileDiv.innerHTML=`
  <h2>${userProfile.userName}'s Profile </h2>  
  <p><strong>Exercise Time:</strong> ${user.userProfile.exerciseTime}</p>
  <p><strong>Breakfast Time:</strong> ${user.userProfile.breakfastTime}</p>
  <p><strong>Lunch Time:</strong> ${user.userProfile.lunchTime}</p>
  <p><strong>Dinner Time:</strong> ${user.userProfile.dinnerTime}</p>
  <p><strong>Meditation Time:</strong> ${user.userProfile.meditationTime}</p>
  
  `;

}

//function to scheduling reminder

function scheduleReminder(scheduleType){
    
     
     const userId = '';
     const newScheduleTime = prompt(`enter new ${scheduleType} schedule time:`);

     //calling the backend api to schedule reminder

     fetch(`/user/userId/schedule`,{
            
           method:'POST',
           headers:{

               'Content-Type' : 'application/json',
           },

           body:JSON.stringify({scheduleType,newScheduleTime}),
     })
     .then(response => response.json())
     .then(data=>{
           alert(data.message);
           loadUserProfile();
     })
     .catch((error=>console.log(error)));

}