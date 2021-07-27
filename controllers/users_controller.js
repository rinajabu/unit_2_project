const bcrypt = require('bcrypt');
const express = require('express');
const users = express.Router();
const User = require('../models/users.js');

users.get('/new', (req, res) => {
    res.render(
        'users/new.ejs',
        {
            currentUser: req.session.currentUser
        }
    );
})

// also checks for existing username
users.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.findOne({username: req.body.username}, (err, foundUsername) => {
        User.create(req.body, (err, createdUser) => {
            console.log(foundUsername);
            // if (err) {
            //     console.log(err);}
            if (foundUsername) {
                res.send('<h2><a href="/users/new">Sorry, username taken. Please choose a different one and try again. Click to return to sign up page.</a></h2>');
            } else {
                console.log('===user is created===', createdUser);
                res.redirect('/main');
            }
        })
    })
})

module.exports = users;