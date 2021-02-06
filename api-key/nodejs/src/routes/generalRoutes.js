const GeneralController = require('../controller/generalController');
const Datasource = require('../data/datasource');
const express = require('express');
const router = express.Router();

const general = new GeneralController(new Datasource());

router.get('/:hash', (req, res) => general.get(req,res));
router.post('/keys', (req, res) => general.put(req, res));
router.get('/grant/key', (req, res) => general.grant(req,res));

module.exports = router;