module.exports = (app, config, passport) => {

    // Login routes
    app.get('/login', function (req, res, next) {
        res.render('passport/mysqllocal/login', {
            subTitle: 'Login',
        });
    });

    app.post('/login', passport.authenticate('local-login-mysql'), function (req, res) {
        res.redirect('/');
    });

    // Register routes
    app.get('/register', function (req, res, next) {
        res.render('passport/mysqllocal/register', {
            subTitle: 'Register',
        });
    });

    app.post('/register', passport.authenticate('local-signup-mysql'), function (req, res, next) {
        res.redirect('/');
    });
};
