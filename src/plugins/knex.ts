import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { Knex } from "knex";
import { envType } from "../app";
import getKnexInstance from "../db/knex";

interface knexPluginOption {
  environment: envType;
}

async function knexPlugin(fastify: FastifyInstance, options: knexPluginOption) {
  const knexInstance = getKnexInstance(options.environment);
  fastify.decorate("db", knexInstance);
}

export default fp(knexPlugin, {
  name: "db",
});

declare module "fastify" {
  interface FastifyInstance {
    db: Knex;
  }
}
