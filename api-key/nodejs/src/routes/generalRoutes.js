const GeneralController = require("../controller/generalController");
const express = require("express");
const router = express.Router();
class GeneralRoutes {
  constructor(datasource) {
    this.general = new GeneralController(datasource);
  }

  routes() {
    /**
     * @api {get} /api/datasource/:hash Get value from datasource
     * @apiGroup Datasource
     *
     * @apiSuccess {String} value data from key in datasource.
     *
     */
    router.get("/:hash", (req, res) => this.general.get(req, res));
    /**
     * @api {post} /api/datasource/keys Insert custom data into datasource
     * @apiGroup Datasource
     *
     * @apiParam {String} key Text value to be the key
     * @apiParam {String} value Text value to be returned
     * @apiParamExample {json} Request-Example:
     *     {
     *       "key": "TEST",
     *       "value": "My Custom Key"
     *     }
     */
    router.post("/keys", (req, res) => this.general.put(req, res));
    /**
     * @api {get} /api/datasource/grant/key Grant random key
     * @apiGroup Datasource
     *
     */
    router.get("/grant/key", (req, res) => this.general.grant(req, res));
    return router;
  }
}

module.exports = GeneralRoutes;
