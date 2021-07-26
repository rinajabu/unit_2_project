const bcrypt = require('bcrypt');
const express = require('express');
const sessions = express.Router();
const User = require('../models/users.js');

sessions.get('/new', (req, res) => {
    res.render(
        'sessions/new.ejs',
        {
            currentUser: req.session.currentUser
        }
    );
})

sessions.post('/', (req, res) => {
    console.log(req.body);
    User.findOne(
        {
            username: req.body.username
        },
        (err, foundUser) => {
            if (err) {
                console.log(err);
            } else if (!foundUser) {
                res.send('<a href="/main">Sorry, no user found. Click to return.</a>');
            } else {
                if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                    req.session.currentUser = foundUser;
                    res.redirect('/main')
                } else {
                    res.send('<a href="/main">Password does not match. Click to return.</a>')
                }
            }
        }
    )
})

sessions.delete('/', (req, res) => {
    req.session.destroy(
        () => {
            res.redirect('/main');
        }
    )
})

module.exports = sessions;