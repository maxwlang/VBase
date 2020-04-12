module.exports = (app, config, passport) => {
    // PassportJS authentication strategy routes.
    require('./mysqllocal')(app, config, passport);

    // Logout should generally be the same for each route
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
};
