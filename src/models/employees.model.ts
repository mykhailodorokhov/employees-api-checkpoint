import { FastifyInstance } from "fastify";
import { EmployeeBodyType } from "../routes/schemas";

const TABLE_NAME = "employees";

export async function getEmployees(fastify: FastifyInstance) {
  const employees = await fastify.db.from(TABLE_NAME).select();
  return employees;
}

export async function getEmployee(fastify: FastifyInstance, id: number) {
  const employees = await fastify.db
    .from(TABLE_NAME)
    .where({ id })
    .select()
    .first();
  return employees;
}

export async function createEmployee(
  fastify: FastifyInstance,
  employee: EmployeeBodyType
) {
  await fastify.db.from(TABLE_NAME).insert(employee);
}

export async function deleteEmployee(fastify: FastifyInstance, id: number) {
  await fastify.db.from(TABLE_NAME).where({ id }).del();
}
