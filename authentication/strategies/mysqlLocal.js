const mysql = require('mysql2');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const config = require('../../config');

const bcryptSaltRounds = 10;
const sqlConnection = mysql.createConnection(config.sql);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    sqlConnection.execute('SELECT * FROM `accounts` WHERE `id` = ?', [
        id,
    ], (err, results) => {
        done(err, results[0]);
    });
});

module.exports = {
    signupStrategy: {
        name: 'local-signup-mysql',
        strategyBirther: () => {
            return new LocalStrategy({
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true,
            }, (req, email, password, done) => {
                const salt = bcrypt.genSaltSync(bcryptSaltRounds);

                // Overwrite password variable with hashed password
                password = bcrypt.hashSync(password, salt);

                if (typeof config.accounts.mysqllocal.username.minLength === 'number'
                 && typeof config.accounts.mysqllocal.username.maxLength === 'number'
                 && (req.body.username.length < config.accounts.mysqllocal.username.minLength
                  || req.body.username.length > config.accounts.mysqllocal.username.maxLength)) return done(null, false, req.flash('Account username does not meet length requirements.'));

                if (typeof config.accounts.mysqllocal.password.minLength === 'number'
                 && typeof config.accounts.mysqllocal.password.maxLength === 'number'
                 && (req.body.password.length < config.accounts.mysqllocal.password.minLength
                  || req.body.password.length > config.accounts.mysqllocal.password.maxLength)) return done(null, false, req.flash('Account password does not meet length requirements.'));

                if (typeof config.accounts.mysqllocal.email.minLength === 'number'
                 && typeof config.accounts.mysqllocal.email.maxLength === 'number'
                 && (req.body.email.length < config.accounts.mysqllocal.email.minLength
                 || req.body.email.length > config.accounts.mysqllocal.email.maxLength)) return done(null, false, req.flash('Account email does not meet length requirements.'));

                sqlConnection.execute('SELECT * FROM `accounts` WHERE `email` = ?', [
                    email.toLowerCase(),
                ], (err, results) => {
                    if (err) return done(err);
                    if (results.length) return done(null, false, req.flash('An account with this email already exists.'));

                    sqlConnection.execute('SELECT * FROM `accounts` WHERE `username` = ?', [
                        req.body.username.toLowerCase(),
                    ], (err, results) => {
                        if (results.length) return done(null, false, req.flash('An account with this username already exists.'));

                        sqlConnection.execute('INSERT INTO `accounts` (username, email, password, firstname, lastname) VALUES (?, ?, ?, ?, ?);', [
                            req.body.username.toLowerCase(),
                            email.toLowerCase(),
                            password,
                            req.body.firstname || '',
                            req.body.lastname || '',
                        ], (err) => {
                            if (err) return done(err);

                            sqlConnection.execute('SELECT * FROM `accounts` WHERE `email` = ?', [
                                email.toLowerCase(),
                            ], (err, results) => {
                                if (err) return done(err);

                                results[0].password = null;

                                // Login
                                // id: results[0].id,
                                // username: results[0].id,
                                // email: results[0].email,
                                return done(null, JSON.parse(JSON.stringify(results[0])));
                            });
                        });
                    });
                });
            });
        },
    },
    loginStrategy: {
        name: 'local-login-mysql',
        strategyBirther: () => {
            return new LocalStrategy({
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true,
            }, (req, email, password, done) => {
                sqlConnection.execute('SELECT * FROM `accounts` WHERE `email` = ?', [
                    email.toLowerCase(),
                ], (err, results) => {
                    if (err) return done(err);
                    if (results.length === 0) return done(null, false, req.flash('Unable to authorize account. Double check the login fields.'));

                    const passwordMatches = bcrypt.compareSync(password, results[0].password);
                    password = null;
                    results[0].password = null;

                    if (!passwordMatches) return done(null, false, req.flash('Unable to authorize account. Double check the login fields.'));

                    // Login
                    // id: results[0].id,
                    // username: results[0].id,
                    // email: results[0].email,
                    return done(null, JSON.parse(JSON.stringify(results[0])));
                });
            });
        },
    },
};
