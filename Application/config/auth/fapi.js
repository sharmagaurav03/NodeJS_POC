module.exports = function (app, passport, callback) {
    app.get('/auth/facebook',
        passport.authenticate('facebook', {
            scope: [ 'email', 'user_about_me'],
            failureRedirect: '/login'
        }), function (req, res) {
            console.log('redir');
            res.redirect('/');
        });

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            failureRedirect: '/login'
        }), callback);
}