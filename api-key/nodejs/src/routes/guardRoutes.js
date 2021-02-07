const express = require("express");
const router = express.Router();
class GuardRoutes {
    
  constructor(datasource) {
    this.datasource = datasource;
  }

  routes() {
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
