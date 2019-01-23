const strategies = require('./strategies');

const authenticationMiddleware = require('./middleware');

module.exports = function (app, config, passport) {
    strategies.forEach(strategy => passport.use(strategy.name, strategy.strategyBirther()));
    passport.authenticationMiddleware = authenticationMiddleware;
};
