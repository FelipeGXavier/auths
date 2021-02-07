const express = require('express');
const app = require('./src/api');
const path = require('path');

app.use('/apidoc', express.static(path.join(__dirname, 'apidoc')));

app.listen(3000);