'use strict';

module.exports = (app, config) => {
    app.get('/', (req, res) => {
        res.redirect('/hello');
    });

    app.get('/hello', (req, res, next) => {
        res.render('pages/hello', {
            title: 'VBase',
            subTitle: 'Welcome to VBase!',
        });
    });
};
