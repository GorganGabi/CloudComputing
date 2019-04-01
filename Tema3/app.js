const express = require ('express');
const HttpStatus = require('http-status-codes');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    console.log(__dirname + '\\public\\index.html');
    res.sendFile(__dirname + '\\public\\index.html');
    res.status(HttpStatus.OK)
        .end();
});

const PORT = 8001;

app.listen(PORT, () =>{
    console.log(`App listening to port ${PORT}`);

});

