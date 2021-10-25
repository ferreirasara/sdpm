import DAO from "../dao/DAO";

export const simulationHistoryService = async (req: any, res: any, next: any) => {
  const dao = new DAO();
  const result = await dao.getLast30Simulations();

  res.send(result);
}

export const simulationStatsService = async (req: any, res: any, next: any) => {
  const dao = new DAO();
  const result = await dao.getSimulationStats();

  res.send(result);
}