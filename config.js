'use strict';

const config = {};


/* * * * Site configuration * * * */
config.site = {};
config.site.name = 'VBase Template';
config.site.description = 'A good NodeJS website starting template.';
config.site.color = '#0de05e';
config.site.isProduction = (process.env.JSEnvironment === 'PRODUCTION');


/* * * * Server information * * * */
config.server = {};
config.server.port = (config.site.isProduction ? 80 : 3000) || 80;


/* * * * Session configuration * * * */
config.session = {};
config.session.key = 'vbase_cookie';
// If set to %VBASE_UNIQUE% in single quotes, VBase will generate a unique key on first run.
config.session.secret = '%VBASE_UNIQUE%';


/* * * * Accounts (Passport.JS) * * * */
// Enable or disable passport and passport protected routes
config.accounts = {};
config.accounts.enabled = true;
config.accounts.mysqllocal = {};
config.accounts.mysqllocal.username = {};
config.accounts.mysqllocal.password = {};
config.accounts.mysqllocal.email = {};

// Local MySQL/MariaDB account requirements, comment to disable
config.accounts.mysqllocal.username.minLength = 5;
// config.accounts.mysqllocal.username.maxLength = 16;
config.accounts.mysqllocal.password.minLength = 5;
// config.accounts.mysqllocal.password.maxLength = 20;
config.accounts.mysqllocal.email.minLength = 5;
// config.accounts.mysqllocal.email.maxLength = 30;


/* * * * MySQL (! >= 8.0) || MariaDB Configuration * * * */
config.sql = {};
config.sql.host = 'localhost';
config.sql.port = 3306;
config.sql.user = 'VBase';
config.sql.password = 'password';
config.sql.database = 'VBase';

if (!config.site.isProduction) console.log('Site in development state.');
Object.freeze(config);
module.exports = config;
