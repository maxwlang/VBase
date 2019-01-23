'use strict';

module.exports = (app, config, passport) => {
    require('./api')(app, config);
    require('./pages')(app, config);

    // Routes requiring authentication go in ./pages/authed, disable in config if not using auth
    if (config.accounts.enabled) require('./passport')(app, config, passport);
    if (config.accounts.enabled) require('./pages/authed')(app, config, passport);

    // Error handling routes. Must stay at bottom.
    require('./errors')(app, config);
};
