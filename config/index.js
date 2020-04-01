const config = {
    site: require('./site'),
    server: require('./server'),
    session: require('./session'),
    accounts: require('./accounts'),
    sql: require('./sql'),
    sentry: require('./sentry'),

    // Does the site need a database?
    useDB: false,
};

if (!config.site.isProduction) console.log('Site in development state.');
Object.freeze(config);
module.exports = config;