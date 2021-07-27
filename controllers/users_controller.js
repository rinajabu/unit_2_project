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

// could not get existing username check to function properly
users.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.findOne({username: req.body.username}, (err, foundUsername) => {
        User.create(req.body, (err, createdUser) => {
            console.log(foundUsername);
            if (err) {
                console.log(err);
            } else if (foundUsername) {
                alert('username exists');
                // res.redirect('/main')
                // res.send('<a href="/main">Sorry, username taken. Click to return.</a>');
            } else {
                console.log('===user is created===', createdUser);
                res.redirect('/main');
            }
        })
    })
})

module.exports = users;