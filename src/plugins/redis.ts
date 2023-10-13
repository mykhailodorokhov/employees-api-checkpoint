import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import * as Redis from "redis";

async function redisPlugin(fastify: FastifyInstance) {
  const redisHost = process.env.REDIS_HOST ?? "localhost";
  const url = `redis://${redisHost}:6379`;

  const redis = Redis.createClient({ url });
  redis.connect();

  console.log(`✅ Redis connected`);
  fastify.decorate("cache", redis);
}

export default fp(redisPlugin, {
  name: "cache",
});

declare module "fastify" {
  interface FastifyInstance {
    cache: ReturnType<typeof Redis.createClient>;
  }
}
