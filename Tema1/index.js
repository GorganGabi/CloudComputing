const http = require('http');
const req = require('request')
const serverHandle = require('./serverHandler.js');
const url = require('url');
const fs = require('fs');

http.createServer(function (request, response) {
    console.log('request ', request.url);
    let params = url.parse(request.url, true).query;

    let route = request.url;
    switch (route) {
        case '/findMyIp':
            if (request.method === "GET") {
                req.get({
                    url: 'https://api.ipify.org',
                    time: true
                }, function (error, res, responseBody) {
                    if (error) {
                        console.log(error)
                    }

                    let url = 'https://api.ipify.org\r\n';
                    fs.appendFile("log.txt", res.timings.end.toString() + " " + url, function (err) {
                        if (err) {
                            return console.log(err);
                        }
                        console.log("The file was saved!");
                    });
                    let body = {
                        ip: responseBody
                    };

                    response.writeHead(200, {'Content-Type': 'application/json'});
                    response.write(JSON.stringify(body));
                    response.end()
                })
            }
            break;
        case `/?ip=${params.ip}`:
            if (request.method === "GET") {
                req.get({
                    url: 'http://ipinfo.io/?token=68cdb4bf2fa89f',
                    time: true
                }, function (error, res, responseBody) {
                    if (error) {
                        console.log(error)
                    }
                    let url = 'http://ipinfo.io/?token=68cdb4bf2fa89f\r\n';
                    fs.appendFile("log.txt", res.timings.end.toString() + " " + url, function (err) {
                        if (err) {
                            return console.log(err);
                        }
                        console.log("The file was saved!");
                    });
                    console.log(responseBody);
                    responseBody = JSON.parse(responseBody);
                    responseBody.city = responseBody.city.replace('ș', 's');
                    responseBody.city = responseBody.city.replace('ț', 't');
                    req.get({
                        url: `http://api.openweathermap.org/data/2.5/weather?q=${responseBody.city}&APPID=87d6c5fa7be21593718862948e2ae53f`,
                        time: true
                    }, function (error, res, responseBody) {
                        if (error) {
                            console.log(error)
                        }
                        let url = `http://api.openweathermap.org/data/2.5/weather?q=${responseBody.city}&APPID=87d6c5fa7be21593718862948e2ae53f\r\n`;
                        fs.appendFile("log.txt", res.timings.end.toString() + " " + url, function (err) {
                            if (err) {
                                return console.log(err);
                            }
                            console.log("The file was saved!");
                        });
                        console.log(responseBody)
                        response.writeHead(200, {'Content-Type': 'application/json'});
                        response.write(JSON.stringify(responseBody));
                        response.end()
                    });
                });
            }
            break;
        case "/metrics":
            fs.readFile('log.txt', 'utf8', function (err, contents) {
                let data = {
                    file: contents
                };
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.write(JSON.stringify(data));
                response.end()
            });
            break;
        default:
            serverHandle.serverHandler(request, response)
    }
}).listen(8125);
console.log('Server running at http://127.0.0.1:8125/');