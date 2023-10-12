import { FastifyInstance } from "fastify";

import deleteEmployeesId from "./delete-employees-id";
import getEmployees from "./get-employees";
import getEmployeesId from "./get-employees-id";
import postEmployees from "./post-employees";

export default async function (fastify: FastifyInstance) {
  fastify.route(getEmployees(fastify));
  fastify.route(getEmployeesId(fastify));
  fastify.route(deleteEmployeesId(fastify));
  fastify.route(postEmployees(fastify));
}
