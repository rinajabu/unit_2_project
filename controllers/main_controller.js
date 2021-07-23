const express = require('express');
const main = express.Router();


//___________________
//////////////// Routes //////////////////
//___________________
//localhost:3000

///// test route (/main) /////
// main.get('/' , (req, res) => {
//   res.send('HI THERE!!');
// });

///// new route /////
main.get('/new', (req, res) => {
    res.render('new.ejs');
})

module.exports = main