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
        res.redirect('/main');
    })
})

///// index route /////
main.get('/', (req, res) => {
    Post.find({}, (err, allPosts) => {
        res.render(
            'index.ejs',
            {
                posts: allPosts
            }
        );
    })
})

///// show route /////
main.get('/:id', (req, res) => {
    Post.findById(req.params.id, (err, foundPost) => {
        res.render(
            'show.ejs',
            {
                post: foundPost
            }
        );
    })
})

module.exports = main