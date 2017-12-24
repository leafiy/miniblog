var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.setup = function (User) {
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function(email, password, done) {
            User.findOne({
                email: email.toLowerCase()
            }, function(err, user) {
                if (err) return done(err);
                if (!user) {
                    return done(null, false, { errorType: 'noSuchUser' });
                }
                if (!user.authenticate(password)) {
                    return done(null, false, { errorType: 'wrongPassword' });
                }

                if(user.status === 3){
                    return done(null, false, { errorType: 'userBanned' });
                }
                // if(user.status === 0){
                //     return done(null, user, { errorMsg: 'emailInactived' });
                // }
                return done(null, user);
            });
        }
    ));
};