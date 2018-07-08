class PokemonsController {
    constructor() {
    }

    create(request, response) {
        response.status(200).json({message: 'taa tuuudo ok'}).end();
    }
}

module.exports = PokemonsController;