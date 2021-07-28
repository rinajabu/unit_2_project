//___________________
////////////////// Dependencies ///////////////
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
require('dotenv').config();
const session = require('express-session');

///////////////// CONTROLLER DEPENDENCIES ////////////////
const mainController = require('./controllers/main_controller.js');
const usersController = require('./controllers/users_controller.js');
const sessionsController = require('./controllers/sessions_controller.js');

//___________________
///////////////// Middleware //////////////////
//___________________
// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
// extended: false - does not allow nested objects in query strings
app.use(express.urlencoded({ extended: false }));
//use public folder for static assets
app.use(express.static('public'));
// returns middleware that only parses JSON - may or may not need it depending on your project
//use method override
app.use(express.json());
// allow POST, PUT and DELETE from a form
app.use(methodOverride('_method'));
// express session middleware
app.use(
    session(
        {
            secret: process.env.SECRET,
            resave: false,
            saveUninitialized: false
        }
    )
);

//////////////////// CONTROLLERS ////////////////////////
app.use ('/main', mainController);
app.use('/users', usersController);
app.use('/sessions', sessionsController);

//___________________
////////////////// Port ///////////////////
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3003;

//___________________
/////////////////// Database ////////////////////
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(
    MONGODB_URI,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    }
);

////////////// Error / success ///////////////////
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// redirect to main page
app.get('/' , (req, res) => {
  res.redirect('/main');
});

//___________________
///////////////// Listener /////////////////////
//___________________
app.listen(PORT, () => console.log( '==UNIT 2 PROJECT==: Listening on port:', PORT));