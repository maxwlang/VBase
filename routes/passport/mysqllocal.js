module.exports = (app, config, passport) => {

    // Login routes
    app.get('/login', (req, res, next) => {
        res.render('passport/mysqllocal/login', {
            subTitle: 'Login',
        });
    });

    app.post('/login', passport.authenticate('local-login-mysql'), (req, res) => {
        res.redirect('/');
    });

    // Register routes
    app.get('/register', (req, res, next) => {
        res.render('passport/mysqllocal/register', {
            subTitle: 'Register',
        });
    });

    app.post('/register', passport.authenticate('local-signup-mysql'), (req, res, next) => {
        res.redirect('/');
    });
};
