# VBase 1.3
Very cool base to NodeJS web projects. Inspired by great work from great people.

![VBase Logo](https://github.com/gotkrypto76/VBase/blob/master/src/img/vbase-logo-long.png?raw=true)

## Features
- Gulp test server and minification.
- SASS and automatic sass compilation.
- ExpressJS and Express Handlebars.
- Switching between Bootstrap 3 and Bootstrap 4 with a single config change.
- Server and client livereload in development for faster code writing.
- Support for MySQL (< 8.0)/MariaDB.
- Automatic SQL Injection protection with prepared statements by default (mysql2 module).
- PassportJS for user account systems with support for multiple strategies.
- Expandable base for building efficient REST APIs in your application.
- Automatic image compression and optomization.
- Automated html form generation and validation with nos-forms.
- SNYK Support for known vulnerability testing.
- Unit tests with Mocha&Chai.
- Webpack for easy javascript resource inclusion and management.
- Optional per-page separated CSS to prevent clashing.
- Error handling.
- Support for older browsers with babel.
- Databases are now optional.

## Changes from previous version
- ~ The `gulp prepare` command is now `gulp production`.
- ~ The main program has been renamed from `index.js` to `app.js`.
- \+ SCSS Linting is introduced via the Stylelint plugin and configuration.
- \+ SCSS files can now be imported from the node_modules folder, reducing redundant files. NPM install your stylesheets.
- \+ ESLint config has been moved into package.json.
- \+ Jump EMCAVersion in ESLint to 8.
- \+ Split config into multiple files.
- \+ Migrate to the 7-1 SCSS layout.
- \+ Sentry.io error handler support in both the frontend and backend.

## Current Releases
1. VBase Zen (from 1.0.0)
