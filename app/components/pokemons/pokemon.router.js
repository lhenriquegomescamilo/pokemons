const PokemonsController = require('./pokemons.controller');

class PokemonRouter {
    constructor() {
        this._pokemonRouter = new PokemonsController();
    }

    routes(application) {
        application.route('/api/pokemons')
            .get((request, response) => {
                console.log('calling here');
                this._pokemonRouter.create(request, response)
            });
    }
}

module.exports = PokemonRouter;