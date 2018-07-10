const PokemonsController = require('./pokemons.controller');

class PokemonRouter {
    constructor() {
        this._pokemonRouter = new PokemonsController();
    }

    routes(application) {
        application.route('/api/pokemons')
            .get((request, response) => this._pokemonRouter.findAll(request, response));

        application.route('/api/pokemons/:id')
            .get((request, response) => this._pokemonRouter.findById(request, response));
    }
}

module.exports = PokemonRouter;