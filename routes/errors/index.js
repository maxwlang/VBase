'use strict';

module.exports = (app, config) => {
    app.get('/error/500', function (req, res, next) {
        res.send('500');
    });
    app.get('/error/404', function (req, res, next) {
        res.send('404');
    });
};
