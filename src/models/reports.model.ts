import { FastifyInstance } from "fastify";
import { Tribe } from "./tribes.model";

const EMPLOYEES_TABLE = "employees";
const TRIBES_TABLE = "tribes";

export async function getReportsEmployees(fastify: FastifyInstance) {
  const tribes: Tribe[] = await fastify.db.from(TRIBES_TABLE).select();

  const report = [];

  for (const tribe of tribes) {
    const employeesOfTribe = await fastify.db
      .from(EMPLOYEES_TABLE)
      .where({ tribe_id: tribe.id })
      .select();

    report.push({
      tribe: tribe.name,
      employees: employeesOfTribe,
    });
  }

  return report;
}
