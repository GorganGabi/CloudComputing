const {Customer} = require('../models/CustomerModel');
const HttpStatus = require('http-status-codes');

module.exports.createCustomer = (req, res) => {
    let contype = req.headers['content-type'];
    if (!contype || contype.indexOf('application/json') !== 0) {
        res.writeHead(HttpStatus.UNSUPPORTED_MEDIA_TYPE);
        res.end();
    }

    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', function () {
        body = JSON.parse(body);
        Customer.findOne({email: body.email}, (err, customer) => {
            if (err) {
                res.writeHead(HttpStatus.BAD_REQUEST);
                res.end();
            }
            if (customer) {
                res.writeHead(HttpStatus.CONFLICT);
                return res.end()
            }

            if (body) {

                Customer.create({
                    name: body.name,
                    email: body.email,
                    phone: body.phone,
                    address: body.address
                }).then(
                    () => {
                        res.writeHead(HttpStatus.CREATED);
                        res.end();
                    }
                ).catch(err => {
                    console.log('[CustomerController] CreateCustomer Error ' + err);
                    res.writeHead(HttpStatus.BAD_REQUEST);
                    res.end();
                });
            }
        });
    });
};

module.exports.getDetails = (req, res) => {

    Customer.find({_id: req.params.id}, (err, customer) => {
        if (err) {
            res.writeHead(HttpStatus.BAD_REQUEST);
            res.end();
        }

        if (!customer) {
            res.writeHead(HttpStatus.NO_CONTENT);
            res.end()
        }

        res.writeHead(HttpStatus.OK, {"Content-Type": "application/json"});
        res.end(JSON.stringify(customer))
    })
};

module.exports.getCustomers = (req, res) => {
    Customer.find({}, (err, Customer) => {
        if (err) {
            res.writeHead(HttpStatus.BAD_REQUEST);
            res.end();
        }
        res.writeHead(HttpStatus.OK, {"Content-Type": "application/json"});
        res.end(JSON.stringify(Customer))
    })
};

module.exports.updateCustomer = (req, res) => {

    let contype = req.headers['content-type'];
    if (!contype || contype.indexOf('application/json') !== 0) {
        res.writeHead(HttpStatus.UNSUPPORTED_MEDIA_TYPE);
        res.end();
    }

    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', function () {

        if (body) {
            body = JSON.parse(body);
            Customer.updateOne(
                {_id: req.params.id},
                {
                    $set: {
                        name: body.name,
                        email: body.email,
                        phone: body.phone,
                        address: body.address
                    },
                },
                {},
                (err, result) => {
                    if (!result.nModified) {
                        res.writeHead(HttpStatus.NO_CONTENT);
                        res.end();
                    } else {
                        res.writeHead(HttpStatus.OK);
                        res.end();
                    }
                })
        }
    });
};

module.exports.deleteCustomer = (req, res) => {
    Customer.deleteOne({_id: req.params.id})
        .then(
            () => {
                res.writeHead(HttpStatus.OK);
                res.end('Succes');
            }
        ).catch(err => {
        console.log('[CustomerController] deleteCustomer Error ' + err);
        res.writeHead(HttpStatus.BAD_REQUEST);
        res.end();
    });
};