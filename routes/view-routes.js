// routes
module.exports = function (app) {
    // // @route:  GET /
    // // @desc:   Render index template
    // app.get("/", function (req, res) {
    //     res.render("index");
    // });

    // @route:  GET /add
    // @desc:   Return add template
    app.get("/add", function (req, res) {
        res.render("add");
    });


};
