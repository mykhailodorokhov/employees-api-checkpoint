import knex, { Knex } from "knex";
import path from "path";

const config: Knex.Config = {
  client: "mysql2",
  version: "8.0",
  migrations: {
    directory: path.join(process.cwd(), "src", "db", "migrations"),
  },
  seeds: {
    directory: path.join(process.cwd(), "src", "db", "seeds"),
  },
  connection: {
    host: "localhost",
    user: "root",
    password: "password",
    database: "employees",
  },
};

export default function () {
  const knexInstance = knex(config);
  console.log(`💽 database connection via knex initialized\n`);

  return knexInstance;
}
