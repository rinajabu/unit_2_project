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
    res.render(
        'new.ejs',
        {
            currentUser: req.session.currentUser
        }    
    );
})

///// index route /////
main.get('/', (req, res) => {
    Post.find({}, (err, allPosts) => {
        res.render(
            'index.ejs',
            {
                posts: allPosts,
                currentUser: req.session.currentUser
            }
        );
    })
})

///// show route /////
main.get('/:id', (req, res) => {
    // console.log(req.params.id);
    // foundPost.views = foundPost.views + 1;
    // req.params.views += 1;
    //  POSSIBLY ADD A Post.findByIdAndUpdate here and updated view count first?
    Post.findById(req.params.id, (err, foundPost) => {
        // console.log(foundPost.views += 1);
        res.render(
            'show.ejs',
            {
                post: foundPost,
                currentUser: req.session.currentUser
            }
        );
        // console.log(viewCount);
        // console.log(views);
    })
})

///// edit route /////
main.get('/:id/edit', (req, res) => {
    Post.findById(req.params.id, (err, foundPost) => {
        res.render(
            'edit.ejs',
            {
                post: foundPost,
                currentUser: req.session.currentUser
            }
        )
    })
})

///// put route /////
main.put('/:id', (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedPost) => {
        res.redirect('/main');
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

///// seed route /////
main.get('/plant/some/seeds', (req, res) => {
    Post.create(
        [
            {
                title: 'Test 1',
                img: 'https://i.insider.com/59b7fe7a9803c51d008b4bfe?width=700',
                thoughts: 'test test test test test test test test test test test test',
                views: 0,
            },
            {
                title: 'Test 2',
                img: 'https://i.insider.com/59b7fe7a9803c51d008b4bfe?width=700',
                thoughts: 'test test test test test test test test test test test test',
                views: 0,
            },
            {
                title: 'Test 3',
                img: 'https://i.insider.com/59b7fe7a9803c51d008b4bfe?width=700',
                thoughts: 'test test test test test test test test test test test test',
                views: 0,
            },
            {
                title: 'Test 4',
                img: 'https://i.insider.com/59b7fe7a9803c51d008b4bfe?width=700',
                thoughts: 'test test test test test test test test test test test test',
                views: 0,
            },
            {
                title: 'Test 5',
                img: 'https://i.insider.com/59b7fe7a9803c51d008b4bfe?width=700',
                thoughts: 'test test test test test test test test test test test test',
                views: 0,
            },
        ],
        (err, data) => {
            res.redirect('/main');
        }
    )
})

module.exports = main