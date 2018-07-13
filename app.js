const Api = require("./app/config/api");

const http = require('http');
const models = require('./app/models');
const Config = require('./app/config/env')();
const api = new Api();
const server = http.createServer(api.express);

models.sequelize
    .authenticate()
    .then(() => {
        const port = process.env.PORT || Config.serverPort;
        server.listen(port);
        console.log(`
           _____ _           _ _                               _           _     _       
  / ____| |         | | |                             | |         (_)   | |      
 | |    | |__   __ _| | | ___ _ __   __ _  ___        | | __ _ _____  __| | __ _ 
 | |    | '_ \\ / _\` | | |/ _ \\ '_ \\ / _\` |/ _ \\   _   | |/ _\` |_  / |/ _\` |/ _\` |
 | |____| | | | (_| | | |  __/ | | | (_| |  __/  | |__| | (_| |/ /| | (_| | (_| |
  \\_____|_| |_|\\__,_|_|_|\\___|_| |_|\\__, |\\___|   \\____/ \\__,_/___|_|\\__,_|\\__,_|
                                     __/ |                                       
      
        `);

        server.on('listening', () => console.log(`Server are running on port ${port}`));
        server.on('error', error => console.log(`Occurred a erro ${error.message}`));
    });



