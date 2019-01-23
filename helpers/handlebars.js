module.exports = function (hbs, config) {
    return hbs.create({
        extname: '.hbs',
        defaultLayout: 'main',
    });
};
