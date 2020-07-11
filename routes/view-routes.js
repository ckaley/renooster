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

    // @route:  GET /edit
    // @desc:   Return edit template  
    app.get("/edit/:id", function (req, res) {
        console.log('hey hey hey',req.params)
        res.render("edit", req.params);
    });
};
