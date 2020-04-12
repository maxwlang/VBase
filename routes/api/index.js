'use strict';

module.exports = (app, config) => {
    app.get('/api/hello', (req, res, next) => {
        res.json({
            success: true,
        });
    });
};
