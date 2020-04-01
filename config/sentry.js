/* * * * Sentry configuration * * * */
const sentry = {

    // Enable sentry.io error logging on this project?
    enabled: false,

    // Should sentry also handle errors on the clientside JS?
    clienterrors: true,

    // Your sentry.io project code
    project: '',

    // Your sentry.io project key
    key: '',
};

module.exports = sentry;
