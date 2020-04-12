'use strict';

module.exports = (app, config) => {

    app.use((req, res, next) => {
        res.status(404);

        // Render html error pages when needed
        if (req.accepts('html')) {
            res.render('errors/404', {
                subTitle: '404',
                url: req.url,
                css: '../errors/404',
            });
            return;
        }

        // Render json error pages when needed
        if (req.accepts('json')) {
            res.send({ error: 'Not found', });
            return;
        }

        // Render text error pages otherwise
        res.type('txt').send('Not found');
    });

    app.use((err, req, res, next) => {
        res.status(500);

        // Render html error pages when needed
        if (req.accepts('html')) {
            res.render('errors/500', {
                subTitle: '500',
                error: err,
                css: '../errors/500',
            });
            return;
        }

        // Render json error pages when needed
        if (req.accepts('json')) {
            res.send({ error: 'Server Error', });
            return;
        }

        // Render text error pages otherwise
        res.type('txt').send('Server Error');
    });
};
