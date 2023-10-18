import getKnexInstance from "../src/db/knex";

type envScriptType = "development" | "production";
const env = (process.env.ENVIRONMENT as envScriptType) ?? "development";

async function migrateDatabase() {
  const knexInstance = getKnexInstance(env);
  await knexInstance.seed.run();

  console.log("✅ Database seeded");
  process.exit(0);
}

migrateDatabase();
