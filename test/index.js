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

describe('Test VBase', () => {

    describe('Test routes', () => {
        describe('Pages', () => {
            it('"/" should redirect to "/hello".', done => {
                chai.request(`${appURL}:3000`)
                    .get('/')
                    .end((err, res) => {
                        expect(res.redirects).to.contain(`${appURL}:3000/hello`);
                        done();
                    });
            });
            it('"/hello" should return status 200.', done => {
                chai.request(`${appURL}:3000`)
                    .get('/hello')
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        done();
                    });
            });
        });
        describe('API', () => {
            it('"/api/hello" should return json with success element.', done => {
                chai.request(`${appURL}:3000`)
                    .get('/api/hello')
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body.success).to.equal(true);
                        done();
                    });
            });
        });

        describe('Accounts when enabled', () => {
            it('"/register" should return status 200.', done => {
                chai.request(`${appURL}:3000`)
                    .get('/register')
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        done();
                    });
            });
            it('"/login" should redirect to "/".', done => {
                chai.request(`${appURL}:3000`)
                    .get('/login')
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        done();
                    });
            });
            it('"/hello/auth" should return status 200.', done => {
                chai.request(`${appURL}:3000`)
                    .get('/hello/auth')
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        done();
                    });
            });
            it('"/logout" should redirect to "/" with destroyed user object.', done => {
                chai.request(`${appURL}:3000`)
                    .get('/logout')
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        done();
                    });
            });
            it('"/hello/auth" should return status 403.', done => {
                chai.request(`${appURL}:3000`)
                    .get('/hello/auth')
                    .end((err, res) => {
                        expect(res).to.have.status(200);
                        done();
                    });
            });
        });

        describe('Accounts when disabled', () => {
            it('"/register" should return status 404.', done => {
                chai.request(`${appURL}:3001`)
                    .get('/register')
                    .end((err, res) => {
                        expect(res).to.have.status(404);
                        done();
                    });
            });
            it('"/login" should return status 404.', done => {
                chai.request(`${appURL}:3001`)
                    .get('/login')
                    .end((err, res) => {
                        expect(res).to.have.status(404);
                        done();
                    });
            });
            it('"/hello/auth" should return status 404.', done => {
                chai.request(`${appURL}:3001`)
                    .get('/hello/auth')
                    .end((err, res) => {
                        expect(res).to.have.status(404);
                        done();
                    });
            });
            it('"/logout" should return status 404.', done => {
                chai.request(`${appURL}:3001`)
                    .get('/logout')
                    .end((err, res) => {
                        expect(res).to.have.status(404);
                        done();
                    });
            });
        });

        describe('Errors', () => {
            it('"/fakeRoute" should redirect to 404 handler.', done => {
                chai.request(`${appURL}:3000`)
                    .get('/fakeRoute')
                    .end((err, res) => {
                        expect(res).to.have.status(404);
                        done();
                    });
            });
            it('"/fakeRoute/500" should redirect to 500 handler.', done => {
                chai.request(`${appURL}:3000`)
                    .get('/fakeRoute/500')
                    .end((err, res) => {
                        expect(res).to.have.status(404);
                        done();
                    });
            });
            it('"/public/fakeFile.png" should redirect to 404 handler.', done => {
                chai.request(`${appURL}:3000`)
                    .get('/public/fakeFile.png')
                    .end((err, res) => {
                        expect(res).to.have.status(404);
                        done();
                    });
            });
            it('End test', done => {
                chai.request(`${appURL}:3000`)
                    .get('/endTests')
                    .end((err, res) => {
                        done();
                    });
            });
        });
    });
});

