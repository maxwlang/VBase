'use strict';

module.exports = (app, config, passport) => {
    app.get('/hello/auth', passport.authenticationMiddleware(), function (req, res, next) {
        res.render('pages/helloauth', {
            subTitle: 'Authed!',
            css: 'helloauth', // This page has a unique css file, on top of the shared main css file.
        });
    });
};
