const env = require("./src/util/env");

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: env.get("DATABASE_DB"),
      user: env.get("DATABASE_USER"),
      password: env.get("DATABASE_PASSWORD"),
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
