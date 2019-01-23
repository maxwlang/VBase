'use strict';

module.exports = (app, config) => {
    app.get('/api/hello', function (req, res, next) {
        res.json({
            success: true,
        });
    });
};
