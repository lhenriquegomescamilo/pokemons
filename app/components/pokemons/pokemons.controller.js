const PokemonService = require('./pokemon.service');
const HttpStatus = require('http-status');

class PokemonsController {
    constructor() {
        this._pokemonService = new PokemonService();
    }


    create(request, response) {
        const newPokemon = request.body;
        this._pokemonService.create(newPokemon)
            .then(pokemonCreated => {
                response.status(HttpStatus.OK).json(pokemonCreated);
            });

    }

    findAll(request, response) {
        this._pokemonService.findAll()
            .then(pokemons => response.status(HttpStatus.OK).json(pokemons))
            .catch(error => response.status(HttpStatus.BAD_GATEWAY).json(error));
    }

    findById(request, response) {
        const idPokemon = request.params.id;
        return this._pokemonService.findById(idPokemon)
            .then(pokemon => response.status(HttpStatus.OK).json(pokemon))
            .catch(error => response.status(HttpStatus.BAD_GATEWAY).json(error))

    }

    removeById(request, response) {
        const idPokemon = request.params.id;
        this._pokemonService.removeById(idPokemon)
            .then(() => response.status(HttpStatus.NO_CONTENT).end())

    }

    updatebyId(request, response) {
        const idPokemon = request.params.id;
        const pokemon = request.body;
        this._pokemonService.updateById(idPokemon, pokemon)
            .then(pokemonUpdated => response.status(HttpStatus.OK).json(pokemonUpdated));
    }

    battle(request, response) {
        const idPokemonA = request.params.pokemonIdA;
        const idPokemonB = request.params.pokemonIdB;
        this._pokemonService
            .findById(idPokemonA)
            .then(pokemonA => this._findAnotherPokemonAndConcat(idPokemonB, pokemonA))
            .then(pokemonsToFight => this._fight(pokemonsToFight.pokemonA, pokemonsToFight.pokemonB))
            .then(pokemonWinner => this._pokemonService.updateById(pokemonWinner.id, {nivel: ++pokemonWinner.nivel}))
            .then(pokemonWinner => response.status(HttpStatus.OK).json(pokemonWinner));
    }

    _findAnotherPokemonAndConcat(idPokemonB, pokemonA) {
        return this._pokemonService.findById(idPokemonB)
            .then(anotherPokemon => {
                return {pokemonA: pokemonA, pokemonB: anotherPokemon};
            });
    }

    _fight(pokemonA, pokemonB) {
        const weights = this._checkLevel(pokemonA, pokemonB);
        const valueRandom = Math.random();
        const pokemonsInArena = [pokemonA, pokemonB];

        let sumScore = 0, lastIndex = weights.length - 1;
        for (let index = 0; index < lastIndex; ++index) {
            sumScore += weights[index];
            if (valueRandom < sumScore) return pokemonsInArena[index];
        }

        return pokemonsInArena[lastIndex];
    }

    _checkLevel(pokemonA, pokemonB) {
        if (pokemonA.nivel == pokemonB.nivel) return [1 / 2, 1 / 2];
        if (pokemonA.nivel > pokemonB.nivel) return [2 / 3, 1 / 3];
        if (pokemonA.nivel < pokemonB.nivel) return [1 / 3, 2 / 3];
    }


}

module.exports = PokemonsController;