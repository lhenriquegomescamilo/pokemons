const {of, from} = require('rxjs');
const {filter} = require('rxjs/operators');
const db = require('../../models');
const plain = require('../../utils/plain');

class PokemonService {

    constructor() {
        this.data = [{
            "id": 1,
            "tipo": "pikachu",
            "treinador": "Thiago",
            "nivel": 1
        }, {
            "id": 2,
            "tipo": "charizard",
            "treinador": "Renato",
            "nivel": 1
        }];

        this._pokemonModel = db.sequelize.model('Pokemon');
    }

    create(pokemon) {
        return Promise
            .resolve(this._pokemonModel.create(pokemon))
            .then(sequelizeObject => {
                return plain(sequelizeObject)
            })

    }

    _extractDefault() {
        return sequelizeObject => {
            return sequelizeObject.dataValues;
        }
    }

    findAll() {
        return Promise.resolve(this._pokemonModel.findAll())
            .then(sequelizeObject => {
                return plain(sequelizeObject);
            })
    }

    findById(idPokemon) {
        return from(this.data)
            .pipe(filter(pokemon => pokemon.id == idPokemon))
    }

    removeById(idPokemon) {
        this.data = this.data.filter(pokemon => pokemon.id != idPokemon);

    }

    updateById(idPokemon, pokemon) {
        const indexPokemon = this.data.findIndex(p => p.id == idPokemon);
        this.data[indexPokemon].treinador = pokemon.treinador;

    }


}

module.exports = PokemonService;