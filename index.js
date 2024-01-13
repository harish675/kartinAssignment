
const express = require('express');
const port = 8000;
const app = express();
const db = require('./config/mongoose');


app.use('/',require('./routes'));


app.listen(port , function(err){
     
      if(err){
         console.log("Error in the running the server",err);
      }

      console.log('Server is running successfully on port', port);
})