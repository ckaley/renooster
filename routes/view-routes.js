// routes
module.exports = function (app) {
    // @route:  GET /
    // @desc:   Render index template
    app.get("/", function (req, res) {
        res.render("index");
    });

    // @route:  GET /add
    // @desc:   Return add template
    app.get("/add", function (req, res) {
        res.render("add");
    });

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
