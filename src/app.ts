import Fastify, { FastifyInstance } from "fastify";
import routes from "./routes";

const fastify: FastifyInstance = Fastify();

fastify.register(routes);

export default fastify;
