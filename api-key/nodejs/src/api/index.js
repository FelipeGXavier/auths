const express = require('express');

const app = express();

const Datasource = require('../data/datasource');
const datasource = new Datasource();

const GeneralRoutes = require('../routes/generalRoutes');
const generalRoutes = new GeneralRoutes(datasource).routes();


const GuardRoutes = require('../routes/guardRoutes');
const guardRoutes = new GuardRoutes(datasource).routes();

app.use(express.json());


app.use('/api/datasource', generalRoutes);
app.use('/api/guard', guardRoutes);

module.exports = app;

