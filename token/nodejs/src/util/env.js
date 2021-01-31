require("dotenv").config();

const get = (namespace) => process.env[namespace];

module.exports = {
  get,
};
