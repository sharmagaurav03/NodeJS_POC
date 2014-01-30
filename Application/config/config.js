module.exports = {
        development: {
                db: 'mongodb://localhost/passport-tut',
                app: {
                        name: 'Passport Authentication Tutorial'
                },
                facebook: {
                        clientID: "657856334277100",
                        clientSecret: "677b795401ed13e03401c9af2ac5c040",
                        callbackURL: "http://localhost:3000/auth/facebook/callback"
                },

                google: {
                        clientID: "52856074936-bnf0j56crbt3ij4d34slb7o9q0oggm3s.apps.googleusercontent.com",
                        clientSecret: "-MZy2HtJPCO5Ei-w1IvB62Ns",
                        callbackURL: "http://localhost:3000/oauth2callback"
                }
        },
          production: {
            db: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL,
                app: {
                        name: 'Passport Authentication Tutorial'
                },
                facebook: {
                        clientID: "657856334277100",
                        clientSecret: "677b795401ed13e03401c9af2ac5c040",
                        callbackURL: "http://localhost:3000/auth/facebook/callback"
                },
                google: {
                        clientID: '52856074936-bnf0j56crbt3ij4d34slb7o9q0oggm3s.apps.googleusercontent.com',
                        clientSecret: '-MZy2HtJPCO5Ei-w1IvB62Ns',
                        callbackURL: 'http://localhost:3000/oauth2callback'
                }
         }
}