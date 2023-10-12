import { FastifyInstance } from "fastify";
import { EmployeeBodyType } from "../routes/schemas";

export async function getEmployees(fastify: FastifyInstance) {
  throw new Error("not implemented");
}

export async function getEmployee(fastify: FastifyInstance, id: number) {
  throw new Error("not implemented");
}

export async function createEmployee(
  fastify: FastifyInstance,
  employee: EmployeeBodyType
) {
  throw new Error("not implemented");
}

export async function deleteEmployee(fastify: FastifyInstance, id: number) {
  throw new Error("not implemented");
}
