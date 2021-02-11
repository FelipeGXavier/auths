const express = require('express');
const routes = require('./routes');
const basic = require('./basic');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', routes);

app.get('/ping', basic, (req, res) => {
    res.send('Ok');
})

module.exports = app;