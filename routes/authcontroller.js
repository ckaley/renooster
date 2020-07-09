module.exports = function() {
    // @route:  GET /login
    // @desc:   Return login template
    app.get("/login", function (req, res) {
        res.render("login");
    });

    // @route:  GET /register
    // @desc:   Return register template
    app.get("/register", function (req, res) {
        res.render("register");
    });
};