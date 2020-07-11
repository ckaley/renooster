var register = function(req, res){
    res.render("register")
};

var login = function(req, res){
    res.render("login")
}

var logout = function(req, res){
    req.session.destroy(function(err){
        res.redirect('/login')
    })
}

var dashboard = function(req, res){
    res.render("index")
}

exports.register = register;
exports.login = login;
exports.logout = logout;
exports.dashboard = dashboard;
    


//ways that did not work (broke the app) 
//=================================================================
// // @route:  GET /register
    // // @desc:   Return register template
    // exports.register = function(req, res) {
    //     res.render("register");
    // };

    // exports.login = function(req, res){
    //     res.render("login")
    // };

    // exports.logout = function(req, res) {
    //     req.session.destroy(function(err) {
    //         res.redirect('/');
    //     });
    // };

//======================================================================
// module.exports = function(app){
//     // @route:  GET /login
//     // @desc:   Return login template
//     app.get("/login", function (req, res) {
//         res.render("login");
//     });

//     // @route:  GET /register
//     // @desc:   Return register template
//     app.get("/register" , function(req, res) {
//         res.render("register");
//     });

//     // @route:  GET /logout
//     // @desc:   Destroy session and return to login template
//     app.get("/logout", function(req, res) {
//         req.session.destroy(function(err) {
//             res.redirect('/login');
//         });
//     });

// }