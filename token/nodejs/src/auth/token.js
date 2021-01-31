const jwt = require("jsonwebtoken");
const env = require("../util/env");

const genToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      env.get("SECRET"),
      { algorithm: "HS256" },
      function (err, token) {
        if (err) reject(err);
        else resolve(token);
      }
    );
  });
};

const decodeToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, env.get("SECRET"), function (err, decoded) {
      if (err) reject(err);
      else resolve(decoded);
    });
  });
};

const middleware = (req, res, next) => {};

module.exports = {
  decodeToken,
  genToken,
  middleware,
};
