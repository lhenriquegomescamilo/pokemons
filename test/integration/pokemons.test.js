const {app, expect, request} = require('./config/helpers');
const HttpStatus = require('http-status');

describe('Testando endpoint de pokemon ', () => {
    describe('GET pokemons', () => {
        it('Buscando por todos pokemons', done => {
            request(app)
                .get('/api/pokemons')
                .set('Content-Type', 'application/json')
                .end((error, response) => {
                    expect(response.status).to.equal(HttpStatus.OK);
                    expect(response.body).to.be.an('array');
                    done(error);
                });
        });

        it('Buscando pokemon por ID', done => {
            request(app)
                .get('/api/pokemons/1')
                .set('Content-Type', 'application/json')
                .end((error, response) => {
                    expect(response.status).to.equal(HttpStatus.OK);
                    expect(response.body).to.be.an('object');
                    done(error);
                });
        });
    });
});