const fs = require('fs');
const path = require('path');

module.exports.serverHandler = (request, response) => {
    let filePath = '.' + request.url;
    if (filePath === './') {
        filePath = './index.html';
    }
    console.log(filePath);
    const extname = String(path.extname(filePath)).toLowerCase();
    console.log('[serverHandler] extname = ' + extname);
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.svg': 'application/image/svg+xml'
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';
    console.log('[serverHandler] contentType= mimeTypes[extname] = ' + contentType);
    fs.readFile(filePath, function (error, content) {
        if (error) {
            if (error.code === 'ENOENT') {
                fs.readFile('./404.html', function (error, content) {
                    response.writeHead(200, {'Content-Type': contentType});
                    response.end(content, 'utf-8');
                });
            } else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
            }
        } else {
            response.writeHead(200, {'Content-Type': contentType});
            response.end(content, 'utf-8');
        }
    });
};