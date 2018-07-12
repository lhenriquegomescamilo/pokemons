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
            .then(pokemonsToFight => this._fight(pokemonsToFight))
            .then(resultOfBattles => this._saveResultOfBattle(resultOfBattles))
            .then(resultOfBattles => response.status(HttpStatus.OK).json(resultOfBattles));
    }

    _findAnotherPokemonAndConcat(idPokemonB, pokemonA) {
        return this._pokemonService.findById(idPokemonB)
            .then(anotherPokemon => {
                return {pokemonA: pokemonA, pokemonB: anotherPokemon};
            });
    }

    _fight(pokemonsToFight) {
        const pokemonsInArena = [pokemonsToFight.pokemonA, pokemonsToFight.pokemonB];
        const pokemonWinner = this._engineFight(pokemonsInArena);
        const pokemonLoser = pokemonsInArena.find(p => p.id != pokemonWinner.id);
        pokemonWinner.nivel++;
        pokemonLoser.nivel--;
        return {pokemonWinner, pokemonLoser};


    }

    _engineFight(pokemonsInArena) {
        const weights = this._checkLevel(pokemonsInArena[0], pokemonsInArena[1]);
        const valueRandom = Math.random();
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


    _saveResultOfBattle(resultOfBattle) {
        const updatePokemonWinner = this._pokemonService.updateById(resultOfBattle.pokemonWinner.id, {
            nivel: resultOfBattle.pokemonWinner.nivel
        });

        const updatePokemonLoser = this._pokemonService.updateById(resultOfBattle.pokemonLoser.id, {
            nivel: resultOfBattle.pokemonLoser.nivel
        });
        return Promise
            .all([updatePokemonWinner, updatePokemonLoser])
            .then(() => {
                if (resultOfBattle.pokemonLoser.nivel == 0) {
                    return this._pokemonService.removeById(resultOfBattle.pokemonLoser.id);
                }
                return Promise.resolve();
            })
            .then(() => {
                return {vencedor: resultOfBattle.pokemonWinner, perderdor: resultOfBattle.pokemonLoser};
            });

    }
}

module.exports = PokemonsController;