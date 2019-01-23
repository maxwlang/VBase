module.exports = (app, config, passport) => {
    require('./helloauth.js')(app, config, passport);
};
