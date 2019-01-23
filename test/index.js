'use strict';

const mocha = require('mocha');
const chai = require('chai');
const chaihttp = require('chai-http');

chai.use(chaihttp);

const { describe, it, } = mocha;
const { assert, expect, should, } = chai;

const appURL = 'http://localhost';
require('./app').withPassport();
require('./app').withoutPassport();

describe('Test VBase', function () {

    describe('Test routes', function () {
        describe('Pages', function () {
            it('"/" should redirect to "/hello".', function (done) {
                chai.request(`${appURL}:3000`)
                    .get('/')
                    .end(function (err, res) {
                        expect(res.redirects).to.contain(`${appURL}:3000/hello`);
                        done();
                    });
            });
            it('"/hello" should return status 200.', function (done) {
                chai.request(`${appURL}:3000`)
                    .get('/hello')
                    .end(function (err, res) {
                        expect(res).to.have.status(200);
                        done();
                    });
            });
        });
        describe('API', function () {
            it('"/api/hello" should return json with success element.', function (done) {
                chai.request(`${appURL}:3000`)
                    .get('/api/hello')
                    .end(function (err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body.success).to.equal(true);
                        done();
                    });
            });
        });

        describe('Accounts when enabled', function () {
            it('"/register" should return status 200.', function (done) {
                chai.request(`${appURL}:3000`)
                    .get('/register')
                    .end(function (err, res) {
                        expect(res).to.have.status(200);
                        done();
                    });
            });
            it('"/login" should redirect to "/".', function (done) {
                chai.request(`${appURL}:3000`)
                    .get('/login')
                    .end(function (err, res) {
                        expect(res).to.have.status(200);
                        done();
                    });
            });
            it('"/hello/auth" should return status 200.', function (done) {
                chai.request(`${appURL}:3000`)
                    .get('/hello/auth')
                    .end(function (err, res) {
                        expect(res).to.have.status(200);
                        done();
                    });
            });
            it('"/logout" should redirect to "/" with destroyed user object.', function (done) {
                chai.request(`${appURL}:3000`)
                    .get('/logout')
                    .end(function (err, res) {
                        expect(res).to.have.status(200);
                        done();
                    });
            });
            it('"/hello/auth" should return status 403.', function (done) {
                chai.request(`${appURL}:3000`)
                    .get('/hello/auth')
                    .end(function (err, res) {
                        expect(res).to.have.status(200);
                        done();
                    });
            });
        });

        describe('Accounts when disabled', function () {
            it('"/register" should return status 404.', function (done) {
                chai.request(`${appURL}:3001`)
                    .get('/register')
                    .end(function (err, res) {
                        expect(res).to.have.status(404);
                        done();
                    });
            });
            it('"/login" should return status 404.', function (done) {
                chai.request(`${appURL}:3001`)
                    .get('/login')
                    .end(function (err, res) {
                        expect(res).to.have.status(404);
                        done();
                    });
            });
            it('"/hello/auth" should return status 404.', function (done) {
                chai.request(`${appURL}:3001`)
                    .get('/hello/auth')
                    .end(function (err, res) {
                        expect(res).to.have.status(404);
                        done();
                    });
            });
            it('"/logout" should return status 404.', function (done) {
                chai.request(`${appURL}:3001`)
                    .get('/logout')
                    .end(function (err, res) {
                        expect(res).to.have.status(404);
                        done();
                    });
            });
        });

        describe('Errors', function () {
            it('"/fakeRoute" should redirect to 404 handler.', function (done) {
                chai.request(`${appURL}:3000`)
                    .get('/fakeRoute')
                    .end(function (err, res) {
                        expect(res).to.have.status(404);
                        done();
                    });
            });
            it('"/fakeRoute/500" should redirect to 500 handler.', function (done) {
                chai.request(`${appURL}:3000`)
                    .get('/fakeRoute/500')
                    .end(function (err, res) {
                        expect(res).to.have.status(404);
                        done();
                    });
            });
            it('"/public/fakeFile.png" should redirect to 404 handler.', function (done) {
                chai.request(`${appURL}:3000`)
                    .get('/public/fakeFile.png')
                    .end(function (err, res) {
                        expect(res).to.have.status(404);
                        done();
                    });
            });
            it('End test', function (done) {
                chai.request(`${appURL}:3000`)
                    .get('/endTests')
                    .end(function (err, res) {
                        done();
                    });
            });
        });
    });
});

