const http = require('http');
const mongo = require('./connection.js');
const userController = require('./controllers/UserController');
const Router = require('router');
const finalhandler = require('finalhandler');


mongo.mongoose;

var api = Router();
api.use('/api', api)

api.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Hello World!')
});

api.post('/users', userController.createUser);
api.get('/users', userController.getUsers)
api.get('/users/:id', userController.getDetails);
api.put('/users/:id', userController.updateUser)
api.delete('/users/:id', userController.deleteUser)
var server = http.createServer(function(req, res) {
    api(req, res, finalhandler(req, res))
});

server.listen(8185);

console.log('Server running at http://127.0.0.1:8185/');