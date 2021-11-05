import DAO from "../dao/DAO";

export const simulatorRatingService = async (req: any, res: any, next: any) => {
  const { rating, comment } = req.body
  const dao = new DAO();

  try {
    await dao.insertSimulationRating({ rating, comment });
    res.send({
      success: true,
      message: "Saved.",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error,
    });
  }
}

export const simulationRatingStatsService = async (req: any, res: any, next: any) => {
  const dao = new DAO();
  const result = await dao.getLast30SimulationRatings();

  res.send(result);
}