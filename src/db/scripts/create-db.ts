import knex, { Knex } from "knex";

const config: Knex.Config = {
  client: "mysql2",
  version: "8.0",
  connection: {
    host: "localhost",
    user: "root",
    password: "password",
  },
};

async function createDatabase() {
  const knexInstance = knex(config);
  await knexInstance.raw("CREATE DATABASE employees");

  console.log("✅ Database created");
  process.exit(0);
}

createDatabase();
