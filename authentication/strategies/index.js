// Array of strategies to be enabled at authentication initialization.
module.exports = [
    // Proprietary custom strategies for local sql database
    require('./mysqllocal').signupStrategy,
    require('./mysqllocal').loginStrategy,

    // Example of additional strategies, in this case, github
    // require('./github').signupStrategy,
    // require('./github').loginStrategy,
];
