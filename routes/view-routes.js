// routes
module.exports = function (app) {
    // @route:  GET /
    // @desc:   Render index template
    app.get("/", function (req, res) {
        res.render("index");
    });

    // @route:  GET /subscriptions
    // @desc:   Return subscriptions template
    app.get("/subscriptions", function (req, res) {
        res.render("subscriptions");
    });
};
