const {app, expect, request} = require('./config/helpers');
const HttpStatus = require('http-status');
const models = require('../../app/models');
describe('Testando endpoint de pokemon ', () => {
    beforeEach(done => {
        const newPokemon = {
            "id": 1,
            "tipo": "pikachu",
            "treinador": "Thiago"
        };
        const PokemonModel = models.sequelize.model('Pokemon');
        PokemonModel.sequelize
            .sync()
            .then(() => {
                PokemonModel
                    .findOrCreate({where: {id: newPokemon.id}, defaults: newPokemon})
                    .spread(() => done());
            })


    });
    describe('POST pokemons', () => {

        it('Cadastrando novo pokemon', done => {
            const newPokemon = {
                "tipo": "pikachu",
                "treinador": "Thiago"
            };

            request(app)
                .post('/api/pokemons')
                .set('Content-Type', 'application/json')
                .send(newPokemon)
                .end((error, response) => {
                    expect(response.status).to.equal(HttpStatus.OK);
                    expect(response.body).to.have.property('id');
                    done(error);
                })
        });
    });

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
                .get('/api/pokemons/2')
                .set('Content-Type', 'application/json')
                .end((error, response) => {
                    expect(response.status).to.equal(HttpStatus.OK);
                    expect(response.body).to.be.an('object');
                    done(error);
                });
        });
    });

    describe('DELETE pokemons', () => {
        it('Remover por id', done => {
            request(app)
                .delete('/api/pokemons/1')
                .set('Content-Type', 'application/json')
                .end((error, response) => {
                    expect(response.status).to.equal(HttpStatus.NO_CONTENT);
                    done(error);
                })
        });
    });


    describe('UPDATE pokemon', () => {
        it('Atualizar treinador por Id Pokemon', done => {
            const trainer = {treinador: 'Thiago'};
            request(app)
                .put('/api/pokemons/2')
                .set('Content-Type', 'application/json')
                .send(trainer)
                .end((error, response) => {
                    expect(response.status).to.equal(HttpStatus.OK);
                    done(error);
                })
        });
    });
});