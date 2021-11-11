import { SimulationData } from "../utils/types"
import AlgorithmRunner from "./AlgorithmRunner"

export const simulationService = async (req: any, res: any, next: any) => {
  const body: SimulationData = req.body;
  const algorithmsToRun: string[] = body.algorithms;

  const memoryInitalState = body.memoryInitalState.split("|");
  const memorySize = body.memorySize
  const pagesQueue = body.pagesQueue.split("|");
  const actionsQueue = body.actionsQueue.split("|");
  const shouldShowDetails = body.memorySize <= 5 && body.numberOfPages <= 10 && pagesQueue.length <= 50;
  const clockInterruption = body.clockInterruption;
  const tau = body.tau

  const response = await AlgorithmRunner.runAlgorithms({ shouldShowDetails, algorithmsToRun, memoryInitalState, actionsQueue, pagesQueue, clockInterruption, memorySize, tau });

  res.send(response);
}