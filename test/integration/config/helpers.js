const Chai = require('chai');
const request = require('supertest');


const Api = require('../../../app/config/api');
const app = new Api().express;
const expect = Chai.expect;

module.exports = {app, expect, request};
