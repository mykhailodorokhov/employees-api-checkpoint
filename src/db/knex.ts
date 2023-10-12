import knex, { Knex } from "knex";

const config: Knex.Config = {
  client: "mysql2",
  version: "8.0",
  connection: {
    host: "localhost",
    user: "root",
    password: "password",
    database: "employees",
  },
};

export default function () {
  const knexInstance = knex(config);
  return knexInstance;
}
