const express = require("express");
const router = express.Router();
class GuardRoutes {
  constructor(datasource) {
    this.datasource = datasource;
  }

  routes() {
    /**
     * @api {get} /api/guard Get value from key in header
     * @apiGroup Guard
     *
     * @apiHeader {String} x-api-key Key present in datasource
     *
     * @apiErrorExample Error-Response:
     * Error 403: Forbidden
     * Forbidden
     */
    router.get("/", this.filter(this.datasource), (req, res) => {
      res.send(req.value);
    });

    return router;
  }

  filter(datasource) {
    return function (req, res, next) {
      const apiKey = req.header("x-api-key");
      if (!!apiKey) {
        if (datasource.has(apiKey)) {
          req.value = datasource.get(apiKey);
          return next();
        }
      }
      return res.sendStatus(403);
    };
  }
}

module.exports = GuardRoutes;
