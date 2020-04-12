'use strict';

const config = require('./config');
const exphbs = require('express-handlebars');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const SqlStore = require('express-mysql-session')(session);
const passport = require('passport');
const flash = require('connect-flash');

// Require in Sentry and initialize if logging is enabled
let Sentry;
if (config.sentry.enabled) {
    Sentry = require('@sentry/node');
    Sentry.init({ dsn: `https://${config.sentry.key}@sentry.io/${config.sentry.project}` });
    config.sentry.Sentry = Sentry;
}

// Create handlebars with our settings, create the express app.
const handlebars = require('./helpers/handlebars')(exphbs, config);
const app = express();

// If using a database, declare our SQL session store.
let sessionStore;
if (config.useDB) sessionStore = new SqlStore(config.sql);

// Setup the application
if (config.sentry.enabled) app.use(Sentry.Handlers.requestHandler());
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');
if (config.accounts.enabled) app.use(flash());
app.use('/public', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, }));
if (config.useDB) {
    app.use(session({
        key: config.session.key,
        secret: config.session.secret,
        store: sessionStore,
        resave: true,
        saveUninitialized: true,
    }));
}

// If using accounts and the database is enabled, tell express to use passport.
if (config.accounts.enabled && config.useDB) app.use(passport.initialize());
if (config.accounts.enabled && config.useDB) app.use(passport.session());

// Pull in our express locals.
app.use(require('./middleware/locals')(config));

// Perform first run setup if needed
require('./helpers/firstrun')();

// If using accounts and the database is enabled, initialize our passport strategies, mount them to the app.
if (config.accounts.enabled && config.useDB) require('./authentication').init(app, config, passport);

// Load in our routes
require('./routes')(app, config, passport);

// Listen on our desired port
app.listen(config.server.port);
console.log(`Server running at port ${config.server.port}.`);
