const http = require('http');

const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('123');
    next();
})

app.use((req, res, next) => {
    console.log('345');
    
})

const server = http.createServer(app);

server.listen(3000);
