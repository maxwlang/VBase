'use strict';

module.exports = (app, config) => {
    app.get('/', function (req, res) {
        res.redirect('/hello');
    });

    app.get('/hello', function (req, res, next) {
        res.render('pages/hello', {
            subTitle: 'Welcome to VBase!',
        });
    });
};
