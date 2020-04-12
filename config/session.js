/* * * * Session configuration * * * */
const session = {
    
    // The session key name
    key: 'vbase_cookie',

    // The session secret
    // If set to %VBASE_UNIQUE% in single quotes, VBase will generate a unique key on first run.
    secret: '%VBASE_UNIQUE%',
};

module.exports = session;
