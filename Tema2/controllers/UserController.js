const {User} = require('../models/UserModel');

module.exports.createUser = (request, response) => {
    console.log("!!!!!!!!!!!!!!!!!!")
    let body = '';
    request.on('data', chunk => {
        body += chunk;
    });

    request.on('end', function () {
        if (body) {
            body = JSON.parse(body);
            User.create({
                username: body.username,
                email: body.email,
                phone: body.phone,
                address: body.address
            }).then(
                () => {
                    response.writeHead(200);
                    response.end('Succes');
                }
            ).catch(err => {
                console.log('[UserController] Error ' + err);
                response.end('Failure');
            });
        }
    });
};