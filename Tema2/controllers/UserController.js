const {User} = require('../models/UserModel');
var HttpStatus = require('http-status-codes');

module.exports.createUser = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', function () {
        if (body) {
            body = JSON.parse(body);
            User.create({
                username: body.username,
                email: body.email,
                phone: body.phone,
                address: body.address
            }).then(
                () => {
                    res.writeHead(HttpStatus.OK);
                    res.end('Succes');
                }
            ).catch(err => {
                console.log('[UserController] CreateUser Error ' + err);
                res.end('Failure');
            });
        }
    });
};

module.exports.getDetails = (req, res) => {

    User.find({_id: req.params.id}, (err, user) => {
        if (err) {
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.end('Failure')
        }
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(user))
    })
};

module.exports.getUsers = (req, res) => {
    User.find({}, (err, user) => {
        if (err) {
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.end('Failure')
        }
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(user))
    })
};

module.exports.updateUser = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', function () {
        if (body) {
            body = JSON.parse(body);
            User.updateOne({_id: req.params.id}, {
                $set: {
                    username: body.username,
                    email: body.email,
                    phone: body.phone,
                    address: body.address
                }
            }).then(
                () => {
                    res.writeHead(200);
                    res.end('Succes');
                }
            ).catch(err => {
                console.log('[UserController] CreateUser Error ' + err);
                res.end('Failure');
            });
        }
    });
};

module.exports.deleteUser = (req, res) => {
    User.deleteOne({_id : req.params.id})
        .then(
            () => {
                res.writeHead(200);
                res.end('Succes');
            }
        ).catch(err => {
        console.log('[UserController] deleteUser Error ' + err);
        res.end('Failure');
    });
};