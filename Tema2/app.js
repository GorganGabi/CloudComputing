const http              = require('http');
const mongo             = require('./connection.js');
const userController    = require('./controllers/CustomerController');
const productController = require('./controllers/ProductController');
const Router            = require('router');
const finalhandler      = require('finalhandler');


mongo.mongoose;

const api = Router();
api.use('/api', api);

api.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.end('Hello World!')
});

api.post('/customers', userController.createCustomer);
api.get('/customers', userController.getCustomers);
api.get('/customers/:id', userController.getCustomer);
api.put('/customers/:id', userController.updateCustomer);
api.delete('/customers/:id', userController.deleteCustomer);
api.post('/customers/:id/products', productController.createProduct);
api.get('/customers/:id/products', productController.getProducts);
api.get('/customers/:id/products/:pid', productController.getProduct);
api.put('/customers/:id/products/:pid', productController.updateProduct);
api.delete('/customers/:id/products/:pid', productController.deleteProduct);

const server = http.createServer(function(req, res) {
    api(req, res, finalhandler(req, res))
});

server.listen(8185);

console.log('Server running at http://127.0.0.1:8185/');