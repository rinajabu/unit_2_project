//___________________
////////////////// Dependencies ///////////////
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
require('dotenv').config()

///////////////// CONTROLLER DEPENDENCIES ////////////////
const mainController = require('./controllers/main_controller.js');

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

//////////////////// CONTROLLERS ////////////////////////
app.use ('/main', mainController);

//___________________
//////////////// Routes //////////////////
//___________________
//localhost:3000
// app.get('/main' , (req, res) => {
//   res.send('HI THERE!!');
// });

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
mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);

////////////// Error / success ///////////////////
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
///////////////// Listener /////////////////////
//___________________
app.listen(PORT, () => console.log( '==UNIT 2 PROJECT==: Listening on port:', PORT));