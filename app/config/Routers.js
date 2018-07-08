const PokemonRouter = require("../components/pokemons/pokemon.router");

class Routers {
    constructor(express) {
        this._pokenmonsRouter = new PokemonRouter();
        this._startRouters(express);
    }


    _startRouters(express) {
        this._pokenmonsRouter.routes(express);
    }
}

module.exports = Routers;