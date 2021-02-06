const express = require('express');

const app = express();

const generalRoutes = require('../routes/generalRoutes');

app.use(express.json());

app.use('/api/datasource', generalRoutes);

module.exports = app;

