module.exports = (hbs, config) => {
    return hbs.create({
        extname: '.hbs',
        defaultLayout: 'main',
    });
};
