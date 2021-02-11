const express = require('express');
const routes = require('./routes');
const basic = require('./basic');

const app = express();

app.use(express.json());

app.use('/api', routes);

app.get('/ping', basic, (req, res) => {
    res.send('Ok');
})

module.exports = app;