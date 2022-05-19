const express = require('express');

const app = express();

app.use('/add-product', (req, res, next) => {
    res.send('<h1>The Add product page</h1>')
})

app.use('/',(req, res, next) => {
    console.log('345');
    res.send('<h1>Hello from Express.js</h1>')
})

app.listen(3000);
