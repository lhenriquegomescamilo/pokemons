const {app, expect, request} = require('./config/helpers');
const HttpStatus = require('http-status');

describe('Testando endpoint de pokemon ', () => {
    describe('GET pokemons', () => {
        it('Buscando todos pokemons', done => {
            request(app)
                .get('/api/pokemons')
                .set('Content-Type', 'application/json')
                .end((error, response) => {
                    expect(response.status).to.equal(HttpStatus.OK);
                    done(error);
                });
        });
    });
});