const PokemonsController = require('./pokemons.controller');

class PokemonRouter {
    constructor() {
        this._pokemonController = new PokemonsController();
    }

    routes(application) {
        application.route('/api/pokemons')
            .post((request, response) => this._pokemonController.create(request, response))
            .get((request, response) => this._pokemonController.findAll(request, response));


        application.route('/api/pokemons/:id')
            .get((request, response) => this._pokemonController.findById(request, response))
            .delete((request, response) => this._pokemonController.removeById(request, response))
            .put((request, response) => this._pokemonController.updatebyId(request, response));

    }
}

module.exports = PokemonRouter;