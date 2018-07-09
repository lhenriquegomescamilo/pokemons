const Api = require("./app/config/api");

const http = require('http');

const api = new Api();
const server = http.createServer(api.express);
// const port = process.env.PORT || Config.serverPort;
const port = 3000;

server.listen(port);
server.on('listening', () => console.log(`Server are running on port ${port}`));
server.on('error', error => console.log(`Occurred a erro ${error.message}`));
