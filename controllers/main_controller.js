const express = require('express');
const main = express.Router();
const Post = require('../models/posts.js');

//////////////// Middleware /////////////////
///// authentication /////
const authenticated = (req, res, next) => {
    if (req.session.currentUser) {
        return next();
    } else {
        res.redirect('/sessions/new');
    }
}

//___________________
//////////////// Routes //////////////////
//___________________
//localhost:3000

///// test route (/main) /////
// main.get('/' , (req, res) => {
//   res.send('HI THERE!!');
// });

///// new route /////
main.get('/new', authenticated, (req, res) => {
    res.render(
        'new.ejs',
        {
            currentUser: req.session.currentUser
        }    
    );
})

///// index route /////
main.get('/', authenticated, (req, res) => {
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
main.get('/:id', authenticated, (req, res) => {
    Post.findById(req.params.id, (err, foundPost) => {
        res.render(
            'show.ejs',
            {
                post: foundPost,
                currentUser: req.session.currentUser
            }
        );
    })
})

///// edit route /////
main.get('/:id/edit', authenticated, (req, res) => {
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

///// comments route /////
main.put('/:id/comments', authenticated, (req, res) => {
    Post.findById(req.params.id, (err, updatedPost) => {
        updatedPost.comments.push(req.body.comments);
        updatedPost.save(() => {
            res.redirect(`/main/${req.params.id}`);
        })
    })
})

///// view count route /////
main.get('/:id/:views', authenticated, (req, res) => {
    Post.findByIdAndUpdate(req.params.id, { $inc: {views: 1} }, { new: true }, (err, foundPost) => {
        res.render(
            'show.ejs',
            {
                post: foundPost,
                currentUser: req.session.currentUser
            }
        );
    })
})

///// likes route /////
main.get('/:id/likes/:likeCount', authenticated, (req, res) => {
    Post.findByIdAndUpdate(req.params.id, { $inc: {likes: 1} }, { new: true }, (err, foundPost) => {
        res.redirect('/main')
    })
})

///// put route /////
main.put('/:id', (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedPost) => {
        res.redirect(`/main/${req.params.id}`);
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
                title: 'Beautiful day at the beach',
                img: 'https://c.shld.net/rpx/i/s/i/spin/image/spin_prod_159492601?',
                thoughts: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam quibusdam, ipsum quaerat officiis, qui, tempora sequi numquam minus doloribus possimus consectetur. Commodi amet suscipit fugiat at. Sunt aut officia dolore beatae velit exercitationem mollitia nisi, vel vero placeat, nihil eligendi quisquam. Amet consequuntur accusantium repellat eveniet fuga porro non ipsam voluptatibus nostrum velit corporis ipsa ab iure, voluptatem sed iste qui, sint ea numquam quis? Numquam facilis illo nobis eius.',
                views: 0,
                comments: [],
            },
            {
                title: 'Hiked an awesome trail',
                img: 'https://s27363.pcdn.co/wp-content/uploads/2019/10/Landmannalaugar.jpg.optimal.jpg',
                thoughts: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam quibusdam, ipsum quaerat officiis, qui, tempora sequi numquam minus doloribus possimus consectetur. Commodi amet suscipit fugiat at. Sunt aut officia dolore beatae velit exercitationem mollitia nisi, vel vero placeat, nihil eligendi quisquam. Amet consequuntur accusantium repellat eveniet fuga porro non ipsam voluptatibus nostrum velit corporis ipsa ab iure, voluptatem sed iste qui, sint ea numquam quis? Numquam facilis illo nobis eius.',
                views: 0,
                comments: [],
            },
            {
                title: 'Went skydiving for the first time!',
                img: 'https://www.wellandgood.com/wp-content/uploads/2018/01/maria-fernanda-gonzalez-unsplash.jpg',
                thoughts: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam quibusdam, ipsum quaerat officiis, qui, tempora sequi numquam minus doloribus possimus consectetur. Commodi amet suscipit fugiat at. Sunt aut officia dolore beatae velit exercitationem mollitia nisi, vel vero placeat, nihil eligendi quisquam. Amet consequuntur accusantium repellat eveniet fuga porro non ipsam voluptatibus nostrum velit corporis ipsa ab iure, voluptatem sed iste qui, sint ea numquam quis? Numquam facilis illo nobis eius.',
                views: 0,
                comments: [],
            },
        ],
        (err, data) => {
            res.redirect('/main');
        }
    )
})

module.exports = main