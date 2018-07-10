const PokemonService = require('./pokemon.service');
const HttpStatus = require('http-status');

class PokemonsController {
    constructor() {
        this._pokemonService = new PokemonService();
    }

    create(request, response) {

    }

    findAll(request, response) {
        this._pokemonService.findAll().subscribe(
            pokemons => response.status(HttpStatus.OK).json(pokemons),
            error => response.status(HttpStatus.BAD_GATEWAY).json(error)
        ).unsubscribe();
    }

    findById(request, response) {
        const idPokemon = request.params.id;
        return this._pokemonService.findById(idPokemon).subscribe(
            pokemon => response.status(HttpStatus.OK).json(pokemon),
            error => response.status(HttpStatus.BAD_GATEWAY).json(error)
        ).unsubscribe();
    }

    removeById(request, response) {
        const idPokemon = request.params.id;
        this._pokemonService.removeById(idPokemon);
        response.status(HttpStatus.NO_CONTENT).end();
    }

    updatebyId(request, response) {
        const idPokemon = request.params.id;
        const pokemon = request.body;
        this._pokemonService.updateById(idPokemon, pokemon);
        response.status(HttpStatus.NO_CONTENT).end();

    }
}

module.exports = PokemonsController;