const http = require('http');
const serverHandle = require('./serverHandler.js');
const mongo = require('./connection.js');
const url = require('url');
const userController = require('./controllers/UserController');


mongo.mongoose;

http.createServer(function (request, response) {
    console.log('request ', request.url);

    let route = request.url;
    switch (route) {
        case '/api/users':
            userController.createUser(request, response);
            break;
        default:
            serverHandle.serverHandler(request, response)
    }
}).listen(8185);
console.log('Server running at http://127.0.0.1:8185/');