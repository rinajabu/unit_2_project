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

///// view count route /////
main.get('/:id/:views', authenticated, (req, res) => {
    // console.log(req.params.id);
    Post.findByIdAndUpdate(req.params.id, { $inc: {views: 1} }, { new: true }, (err, foundPost) => {
        console.log(foundPost);
        res.render(
            'show.ejs',
            {
                post: foundPost,
                currentUser: req.session.currentUser
            }
        );
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
                title: 'Test 1',
                img: 'https://i.insider.com/59b7fe7a9803c51d008b4bfe?width=700',
                thoughts: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam quibusdam, ipsum quaerat officiis, qui, tempora sequi numquam minus doloribus possimus consectetur. Commodi amet suscipit fugiat at. Sunt aut officia dolore beatae velit exercitationem mollitia nisi, vel vero placeat, nihil eligendi quisquam. Amet consequuntur accusantium repellat eveniet fuga porro non ipsam voluptatibus nostrum velit corporis ipsa ab iure, voluptatem sed iste qui, sint ea numquam quis? Numquam facilis illo nobis eius.',
                views: 0,
            },
            {
                title: 'Test 2',
                img: 'https://i.insider.com/59b7fe7a9803c51d008b4bfe?width=700',
                thoughts: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam quibusdam, ipsum quaerat officiis, qui, tempora sequi numquam minus doloribus possimus consectetur. Commodi amet suscipit fugiat at. Sunt aut officia dolore beatae velit exercitationem mollitia nisi, vel vero placeat, nihil eligendi quisquam. Amet consequuntur accusantium repellat eveniet fuga porro non ipsam voluptatibus nostrum velit corporis ipsa ab iure, voluptatem sed iste qui, sint ea numquam quis? Numquam facilis illo nobis eius.',
                views: 0,
            },
            {
                title: 'Test 3',
                img: 'https://i.insider.com/59b7fe7a9803c51d008b4bfe?width=700',
                thoughts: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam quibusdam, ipsum quaerat officiis, qui, tempora sequi numquam minus doloribus possimus consectetur. Commodi amet suscipit fugiat at. Sunt aut officia dolore beatae velit exercitationem mollitia nisi, vel vero placeat, nihil eligendi quisquam. Amet consequuntur accusantium repellat eveniet fuga porro non ipsam voluptatibus nostrum velit corporis ipsa ab iure, voluptatem sed iste qui, sint ea numquam quis? Numquam facilis illo nobis eius.',
                views: 0,
            },
            {
                title: 'Test 4',
                img: 'https://i.insider.com/59b7fe7a9803c51d008b4bfe?width=700',
                thoughts: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam quibusdam, ipsum quaerat officiis, qui, tempora sequi numquam minus doloribus possimus consectetur. Commodi amet suscipit fugiat at. Sunt aut officia dolore beatae velit exercitationem mollitia nisi, vel vero placeat, nihil eligendi quisquam. Amet consequuntur accusantium repellat eveniet fuga porro non ipsam voluptatibus nostrum velit corporis ipsa ab iure, voluptatem sed iste qui, sint ea numquam quis? Numquam facilis illo nobis eius.',
                views: 0,
            },
            {
                title: 'Test 5',
                img: 'https://i.insider.com/59b7fe7a9803c51d008b4bfe?width=700',
                thoughts: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam quibusdam, ipsum quaerat officiis, qui, tempora sequi numquam minus doloribus possimus consectetur. Commodi amet suscipit fugiat at. Sunt aut officia dolore beatae velit exercitationem mollitia nisi, vel vero placeat, nihil eligendi quisquam. Amet consequuntur accusantium repellat eveniet fuga porro non ipsam voluptatibus nostrum velit corporis ipsa ab iure, voluptatem sed iste qui, sint ea numquam quis? Numquam facilis illo nobis eius.',
                views: 0,
            },
        ],
        (err, data) => {
            res.redirect('/main');
        }
    )
})

module.exports = main