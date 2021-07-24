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

///// create route /////
main.post('/', (req, res) => {
    Post.create(req.body, (err, createdPost) => {
        res.redirect('/main');
    })
})

///// delete route /////
main.delete('/:id', (req, res) => {
    Post.findByIdAndRemove(req.params.id, (err, foundPost) => {
        res.redirect('/main');
    })
})

module.exports = main