var User = require('../models/user');
var Auth = require('./middlewares/authorization.js');

module.exports = function (app, passport, callback) {
    app.get("/", function (req, res) {
        callback(req, res)
        /**employeeProvider.findAll(function (error, emps) {
            if (req.isAuthenticated()) {
                res.render("index", { user: req.user,
                    title: 'List of Employees',
                    employees: emps
                });
            } else {
                res.render("home", { user: null});
            }
        })    **/
    });

    app.get("/login", function (req, res) {
        res.render("login");
    });

    app.post("/login"
        , passport.authenticate('local', {
            successRedirect: "/",
            failureRedirect: "/signup"
        })
    );

    app.get("/signup", function (req, res) {
        res.render("signup");
    });

    app.post("/signup", Auth.userExist, function (req, res, next) {
        User.signup(req.body.email, req.body.password, function (err, user) {
            if (err) throw err;
            req.login(user, function (err) {
                if (err) return next(err);
                return res.redirect("profile");
            });
        });
    });


    app.get("/profile", Auth.isAuthenticated, function (req, res) {
        res.render("profile", { user: req.user});
    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/login');
    });


}