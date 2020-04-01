/* * * * Accounts (Passport.JS) * * * */

// Enable or disable passport and passport protected routes
const accounts = {

    // Enable account system?
    enabled: true,
    
    // Configuration for the mysqllocal authentication strategy
    mysqllocal: {

        // Username options
        username: {
            minLength: 5,
            // maxLength: 16,
        },

        // Password options
        password: {
            minLength: 5,
            // maxLength: 20,
        },

        // Email options
        email: {
            minLength: 5,
            // maxLength: 30,
        },
    },
};

module.exports = accounts;
