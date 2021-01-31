const connect = require("../util/connect");

const findByEmail = (email) => {
  return connect("users").where({ email }).first();
};

const insert = (user) => {
  return connect("users").insert(user);
};

module.exports = {
  insert,
  findByEmail,
};
