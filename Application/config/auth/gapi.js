module.exports = function(app, passport, callback){
	app.get('/auth/google',
          passport.authenticate(
                  'google',
                  {
                          scope: [
                          'https://www.googleapis.com/auth/userinfo.profile',
                          'https://www.googleapis.com/auth/userinfo.email'
                          ]
                  })
          );

	app.get('/oauth2callback',passport.authenticate('google', { failureRedirect: '/login',failureFlash: true, successFlash: 'Welcome!'}), callback);


}