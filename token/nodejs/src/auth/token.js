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

const middleware = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (authHeader && authHeader.includes("Bearer")) {
    const token = authHeader.substr(7);
    try {
      const decoded = await decodeToken(token);
      req.user = decoded;
      return next();
    } catch (err) {
      return res.sendStatus(403);
    }
  }
  return res.sendStatus(403);
};

module.exports = {
  decodeToken,
  genToken,
  middleware,
};
