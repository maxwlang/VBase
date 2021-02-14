/* * * * Server information * * * */
const site = require('./site');

const server = {

    // The port of the webserver.
	port: (process.env['PORT'] ? process.env['PORT'] : (site.isProduction ? 80 : 3000) || 80),
};

module.exports = server;
