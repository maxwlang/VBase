'use strict';

const exphbs = require('express-handlebars');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const SqlStore = require('express-mysql-session')(session);
const passport = require('passport');
const flash = require('connect-flash');

const config = require('../config.js');
const handlebars = require('../helpers/handlebars')(exphbs, config);

module.exports = {
    withPassport: function () {
        const app = express();
        const sessionStore = new SqlStore(config.sql);

        app.engine('handlebars', handlebars.engine);
        app.set('view engine', 'handlebars');
        if (config.accounts.enabled) app.use(flash());
        app.use('/public', express.static('public'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true, }));
        app.use(session({
            key: config.session.key,
            secret: config.session.secret,
            store: sessionStore,
            resave: true,
            saveUninitialized: true,
        }));
        if (config.accounts.enabled) app.use(passport.initialize());
        if (config.accounts.enabled) app.use(passport.session());

        require('../helpers/firstrun')();
        if (config.accounts.enabled) require('../authentication').init(app, config, passport);
        require('../routes')(app, config, passport);

        app.get('/endTests', function (req, res) {
            res.send('Closing..');
            console.log('Closing..');
            process.exit(0);
        });

        app.listen(3000);
    },
    withoutPassport: function () {
        const app = express();
        const sessionStore = new SqlStore(config.sql);

        config.accounts.enabled = false;
        app.engine('handlebars', handlebars.engine);
        app.set('view engine', 'handlebars');
        if (config.accounts.enabled) app.use(flash());
        app.use('/public', express.static('public'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true, }));
        app.use(session({
            key: config.session.key,
            secret: config.session.secret,
            store: sessionStore,
            resave: true,
            saveUninitialized: true,
        }));

        if (config.accounts.enabled) app.use(passport.initialize());
        if (config.accounts.enabled) app.use(passport.session());

        require('../helpers/firstrun')();
        if (config.accounts.enabled) require('../authentication').init(app, config, passport);
        require('../routes')(app, config, passport);

        app.get('/endTests', function (req, res) {
            res.send('Closing..');
            console.log('Closing..');
            process.exit(0);
        });

        app.listen(3001);
    },
};
