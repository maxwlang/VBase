'use strict';

const exphbs = require('express-handlebars');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const SqlStore = require('express-mysql-session')(session);
const passport = require('passport');
const flash = require('connect-flash');

const config = require('./config.js');
const handlebars = require('./helpers/handlebars')(exphbs, config);

const app = express();
let sessionStore;
if (config.useDB) sessionStore = new SqlStore(config.sql);

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
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
if (config.accounts.enabled && config.useDB) app.use(passport.initialize());
if (config.accounts.enabled && config.useDB) app.use(passport.session());
app.use(require('./middleware/locals')(config));

require('./helpers/firstrun')();
if (config.accounts.enabled && config.useDB) require('./authentication').init(app, config, passport);
require('./routes')(app, config, passport);

app.listen(config.server.port);
console.log(`Server running at port ${config.server.port}.`);

process.on('uncaughtException', error => console.error('Caught exception: ', error));
