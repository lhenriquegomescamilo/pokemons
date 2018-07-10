const {of} = require('rxjs');
const {filter, map} = require('rxjs/operators');
const _ = require('lodash');

class PokemonService {

    constructor() {

    }

    findAll() {
        return of(this._mockData());
    }

    _mockData() {
        return [{
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
    }

    findById(idPokemon) {
        return this.findAll()
            .pipe(filter(pokemons => pokemons.filter(pokemon => pokemon.id === idPokemon)))
            .pipe(map(_.head))
    }
}

module.exports = PokemonService;