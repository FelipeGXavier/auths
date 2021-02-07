const GeneralController = require("../controller/generalController");
const express = require("express");
const router = express.Router();
class GeneralRoutes {
  constructor(datasource) {
    this.general = new GeneralController(datasource);
  }

  routes() {
    router.get("/:hash", (req, res) => this.general.get(req, res));
    router.post("/keys", (req, res) => this.general.put(req, res));
    router.get("/grant/key", (req, res) => this.general.grant(req, res));
    return router;
  }
}

module.exports = GeneralRoutes;
