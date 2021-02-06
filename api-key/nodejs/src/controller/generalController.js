const uuid = require('uuid');

class GeneralController {

    constructor(datasource) {
        this.datasource = datasource;
    }

    get(req, res) {
        return res.send(this.datasource.get(req.params.hash));
    }

    grant(req, res) {
        const hash = uuid.v4().toUpperCase().replace(/-/g, "");
        this.datasource.put(hash, 'default');
        return res.send(hash);
    }

    put(req, res) {
        const {key, value} = req.body;
        this.datasource.put(key, value);
        return res.sendStatus(200);
    }
}

module.exports = GeneralController;