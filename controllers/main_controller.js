const express = require('express');
const main = express.Router();
const Post = require('../models/posts.js');


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

///// create route /////
main.post('/', (req, res) => {
    Post.create(req.body, (err, createdPost) => {
        res.send(createdPost);
    })
})

module.exports = main