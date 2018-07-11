const PokemonService = require('./pokemon.service');
const HttpStatus = require('http-status');

class PokemonsController {
    constructor() {
        this._pokemonService = new PokemonService();
    }


    create(request, response) {
        const newPokemon = request.body;
        const pokemonCreated = this._pokemonService.create(newPokemon);
        response.status(HttpStatus.OK).json(pokemonCreated);
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

    battle(request, response) {
        const idPokemonA = request.params.pokemonIdA;
        const idPokemonB = request.params.pokemonIdB;

        this._pokemonService
            .findById(idPokemonA)
            .subscribe(pokemonA => {
                this._pokemonService
                    .findById(idPokemonB)
                    .subscribe(pokemonB => {
                        const pokemonWinner = this._fight(pokemonA, pokemonB)
                        this._pokemonService.updateById(pokemonWinner.id, {nivel: pokemonWinner.nivel++})
                        response.status(HttpStatus.OK).json(pokemonWinner);
                    });
            });


    }

    _fight(pokemonA, pokemonB) {
        let weights = [];
        const valueRandom = Math.random();

        const pokemonsInArena = [pokemonA, pokemonB];

        if (pokemonA.nivel == pokemonB.nivel) weights = [1 / 2, 1 / 2];
        if (pokemonA.nivel > pokemonB.nivel) weights = [2 / 3, 1 / 3];
        if (pokemonA.nivel < pokemonB.nivel) weights = [1 / 3, 2 / 3];

        let sumScore = 0, lastIndex = weights.length - 1;
        for (let index = 0; index < lastIndex; ++index) {
            sumScore += weights[index];
            if (valueRandom < sumScore) return pokemonsInArena[index];
        }

        return pokemonsInArena[lastIndex];
    }
}

module.exports = PokemonsController;