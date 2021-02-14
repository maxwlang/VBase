module.exports = {
    apps: [
        {
            name: "vbase",
            script: "./app.js",
            watch: true,
            env: {
                "JSEnvironment": "DEVELOPMENT",
                "PORT": 3000
            },
            env_production: {
                "JSEnvironment": "PRODUCTION",
                "PORT": 8080
            }
        }
    ]
}