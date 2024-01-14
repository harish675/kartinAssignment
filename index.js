const express = require('express');
const port = 8000;
const app = express();
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport_local');

app.use(express.static('./assets'));
app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScript', true);

// set the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
  name: 'something',
  secret: 'donothing',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: (1000 * 60 * 100)
  }
}));

// Add this middleware to handle JSON data
app.use(express.json());

app.use(express.urlencoded({ extended: true })); // Specify extended option explicitly
app.use(passport.initialize());
app.use(passport.session());
app.use('/', require('./routes'));

app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the server", err);
  }

  console.log('Server is running successfully on port', port);
});
