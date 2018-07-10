const {of, from} = require('rxjs');
const {filter, map} = require('rxjs/operators');
const _ = require('lodash');

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
    }

    create(newPokemon) {
        const pokemons = {...newPokemon, id: 3, nivel: 1};
        this.data.push(pokemons );
        return pokemons;
    }

    findAll() {
        return of(this.data);
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