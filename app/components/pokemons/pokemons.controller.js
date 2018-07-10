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
        console.log("REQUEST", request.params.id);
        const idPokemon = request.params.id;
        return this._pokemonService.findById(idPokemon).subscribe(
            pokemon => response.status(HttpStatus.OK).json(pokemon),
            error => response.status(HttpStatus.BAD_GATEWAY).json(error)
        ).unsubscribe();
    }

}

module.exports = PokemonsController;