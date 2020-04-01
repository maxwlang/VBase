/* * * * Site configuration * * * */
const site = {

    // Site name, shows up in search engines, titles, and rich content embeds.
    name: 'VBase Template',

    // Site description. Shows up in search engines and rich content embeds.
    description: 'A good NodeJS website starting template.',
    
    // Set the sites primary color scheme, shows up in rich content embeds.
    color: '#0de05e',

    // Determine if the site is running in a production environment.
    isProduction: (process.env.JSEnvironment === 'PRODUCTION'),
};

module.exports = site;
