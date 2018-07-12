const Api = require("./app/config/api");

const http = require('http');
const models = require('./app/models');
const Config = require('./app/config/env')();
const api = new Api();
const server = http.createServer(api.express);

models.sequelize
    .sync()
    .then(() => {
        const port = process.env.PORT || Config.serverPort;
        server.listen(port);
        server.on('listening', () => console.log(`Server are running on port ${port}`));
        server.on('error', error => console.log(`Occurred a erro ${error.message}`));
    });



