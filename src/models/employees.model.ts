import { FastifyInstance } from "fastify";
import { EmployeeBodyType } from "../routes/schemas";
import { Tribe } from "./tribes.model";

interface EmployeeDTO {
  id: number;
  name: string;
  title: string;
  tribe: Tribe;
}

interface EmployeeQueryResult {
  id: number;
  name: string;
  title: string;
  "tribe.id": number;
  "tribe.name": string;
  "tribe.department": string;
}

const TABLE_NAME = "employees";

const toEmployeeDTO = (employee: EmployeeQueryResult): EmployeeDTO => {
  const employeeDTO: EmployeeDTO = {
    id: employee.id,
    name: employee.name,
    title: employee.title,
    tribe: {
      id: employee["tribe.id"],
      name: employee["tribe.name"],
      department: employee["tribe.department"],
    },
  };

  return employeeDTO;
};

export async function getEmployees(
  fastify: FastifyInstance
): Promise<EmployeeDTO[]> {
  const employeesQuery = await fastify.db
    .from(TABLE_NAME)
    .innerJoin("tribes", "tribes.id", "employees.tribe_id")
    .select(
      "employees.id as id",
      "employees.name as name",
      "employees.title as title",
      "tribes.id as tribe.id",
      "tribes.name as tribe.name",
      "tribes.department as tribe.department"
    );

  const employees: EmployeeDTO[] = employeesQuery.map(toEmployeeDTO);

  return employees;
}

export async function getEmployee(fastify: FastifyInstance, id: number) {
  const employeeQuery = await fastify.db
    .from(TABLE_NAME)
    .select(
      "employees.id as id",
      "employees.name as name",
      "employees.title as title",
      "tribes.id as tribe.id",
      "tribes.name as tribe.name",
      "tribes.department as tribe.department"
    )
    .innerJoin("tribes", "tribes.id", "employees.tribe_id")
    .where({ id })
    .first();

  return toEmployeeDTO(employeeQuery);
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
