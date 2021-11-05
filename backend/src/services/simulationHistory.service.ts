import DAO from "../dao/DAO";

export const simulationHistoryService = async (req: any, res: any, next: any) => {
  try {
    const dao = new DAO();
    const data = await dao.getLast30Simulations();

    res.send({ success: true, data });
  } catch (error) {
    console.log(error)
    res.send({ success: false, message: `Erro: ${(error as Error).message}` });
  }
}

export const simulationStatsService = async (req: any, res: any, next: any) => {
  try {
    const dao = new DAO();
    const data = await dao.getSimulationStats();

    res.send({ success: true, data });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: `Erro: ${(error as Error).message}` });
  }
}