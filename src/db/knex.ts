import knex, { Knex } from "knex";
import path from "path";
import fileKnexConfigs from "../../knexconfig";
import { envType } from "../app";

function getKnexConfig(environment: envType) {
  const fileKnexConfig: Knex.Config = fileKnexConfigs[environment];

  const knexConfig = {
    ...fileKnexConfig,
    migrations: {
      directory: path.join(process.cwd(), "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(process.cwd(), "src", "db", "seeds"),
    },
  };

  return knexConfig;
}

export default function (environment: envType) {
  const config = getKnexConfig(environment);
  const knexInstance = knex(config);
  console.log(`💽 database connection via knex initialized\n`);

  return knexInstance;
}
