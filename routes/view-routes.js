// routes
module.exports = function (app) {
    // @route:  GET /
    // @desc:   Render index template
    app.get("/", function (req, res) {
        res.render("index");
    });

    // @route:  GET /posts
    // @desc:   Return posts template
    app.get("/posts", function (req, res) {
        res.render("posts");
    });
};
