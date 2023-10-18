import { FastifyInstance } from "fastify";
import { env } from "process";
import knexPlugin from "./plugins/knex";
import redisPlugin from "./plugins/redis";
import routes from "./routes";

export type envType = "development" | "production" | "test";

const environment = (process.env.ENVIRONMENT as envType) ?? "development";
const redisHost = process.env.REDIS_HOST ?? "localhost";

async function app(fastify: FastifyInstance) {
  fastify.register(knexPlugin, {
    environment,
  });
  fastify.register(redisPlugin, {
    environment,
    redisHost,
  });
  fastify.register(routes);

  console.log(`✅ fastify instance configured (env: ${env})\n`);
}

export default app;
