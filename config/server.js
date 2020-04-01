/* * * * Server information * * * */
const site = require('./site');

const server = {

    // The port of the webserver.
    port: (site.isProduction ? 80 : 3000) || 80,
};

module.exports = server;
