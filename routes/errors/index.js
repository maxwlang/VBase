'use strict';

module.exports = (app, config) => {

    app.use(function (req, res, next) {
        res.status(404);

        if (req.accepts('html')) {
            res.render('errors/404', {
                subTitle: '404',
                url: req.url,
                css: '../errors/404',
            });
            return;
        }

        if (req.accepts('json')) {
            res.send({ error: 'Not found', });
            return;
        }

        res.type('txt').send('Not found');
    });

    app.use(function (err, req, res, next) {
        res.status(500);

        if (req.accepts('html')) {
            res.render('errors/500', {
                subTitle: '500',
                error: err,
                css: '../errors/500',
            });
            return;
        }

        if (req.accepts('json')) {
            res.send({ error: 'Server Error', });
            return;
        }

        res.type('txt').send('Server Error');
    });
};
