import DAO from "../dao/DAO";

export const simulatorRatingService = async (req: any, res: any, next: any) => {
  const { rating, comment } = req.body
  const dao = new DAO();

  try {
    await dao.insertSimulationRating({ rating, comment });
    res.send({ success: true });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: `Erro: ${(error as Error).message}` });
  }
}

export const simulationRatingStatsService = async (req: any, res: any, next: any) => {
  try {
    const dao = new DAO();
    const data = await dao.getLast30SimulationRatings();

    res.send({ success: true, data });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: `Erro: ${(error as Error).message}` });
  }
}