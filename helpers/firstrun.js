const fs = require('fs');
const uuidv4 = require('uuid/v4');

module.exports = function () {
    let configFile = fs.readFileSync('./config/session.js', 'utf8');

    // Swap instances of '%VBASE_UNIQUE%' in config.js with GUIDs.
    if (configFile.indexOf('\'%VBASE_UNIQUE%\'') > -1) {
        configFile = configFile.replace(/'%VBASE_UNIQUE%'/g, `'${uuidv4()}'`);
        try {
            fs.writeFileSync('./config/session.js', configFile);
            console.log('[FirstRun Helper] Generated GUIDs for \'%VBASE_UNIQUE%\'.');
        } catch (e) {
            console.error(`[FirstRun Helper] Failed to generate GUIDs: ${e}`);
        }
    }
};
