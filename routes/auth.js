var db = require("../models");

module.exports = function(app, passport) {
    // @route:  POST /
    // @desc:   Register a new user
    app.post('/register', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/register'
    }
    ));
};