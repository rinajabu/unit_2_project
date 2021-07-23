const express = require('express');
const main = express.Router();


//___________________
//////////////// Routes //////////////////
//___________________
//localhost:3000
main.get('/' , (req, res) => {
  res.send('HI THERE!!');
});

module.exports = main