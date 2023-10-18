import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import * as Redis from "redis";
import * as RedisMock from "redis-mock";
import { envType } from "../app";

interface redisPluginOptions {
  environment: envType;
  redisHost: string;
}

async function redisPlugin(
  fastify: FastifyInstance,
  options: redisPluginOptions
) {
  if (options.environment === "test") {
    const redis = RedisMock.createClient();
    fastify.decorate("cache", redis);
    console.log(`📝 Redis-mock connected\n`);

    return;
  }
  const url = `redis://${options.redisHost}:6379`;

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
