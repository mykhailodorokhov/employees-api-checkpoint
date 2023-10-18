import getKnexInstance from "../src/db/knex";

type envType = "development" | "production";
const env = (process.env.ENVIRONMENT as envType) ?? "development";

async function migrateDatabase() {
  const knexInstance = getKnexInstance(env);
  await knexInstance.migrate.up();

  console.log("✅ Database migrated");
  process.exit(0);
}

migrateDatabase();
