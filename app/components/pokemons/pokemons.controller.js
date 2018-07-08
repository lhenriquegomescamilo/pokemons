class PokemonsController {
    constructor() {
    }

    create(request, response) {
        console.log('doido rei to aqui');
        response.status(200).end();
    }
}

module.exports = PokemonsController;