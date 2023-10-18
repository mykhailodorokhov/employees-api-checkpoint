import knex from "knex";
import fileKnexConfigs from "../knexconfig";
import { envType } from "../src/app";

const env = (process.env.ENVIRONMENT as envType) ?? "development";

async function createDatabase() {
  const knexConfig = fileKnexConfigs[env];

  const dbName = knexConfig.connection.database;
  knexConfig.connection.database = undefined;

  const knexInstance = knex(knexConfig);
  await knexInstance.raw(`CREATE DATABASE ${dbName}`);

  console.log("✅ Database created");
  process.exit(0);
}

createDatabase();
