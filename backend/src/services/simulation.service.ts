import { SimulationData } from "../utils/types"
import AlgorithmRunner from "./algorithms/AlgorithmRunner"

export const simulateService = async (req: any, res: any, next: any) => {
  const body: SimulationData = req.body;
  const algorithmsToRun: string[] = body.algorithms;

  const memoryInitalState = body.memoryInitalState.split('|');
  const pagesQueue = body.pagesQueue.split('|');
  const actionsQueue = body.actionsQueue.split('|');
  const shouldShowDetails = body.memorySize <= 5 && body.numberOfPages <= 10 && pagesQueue.length <= 15;
  const clockInterruption = body.clockInterruption;

  const response = AlgorithmRunner.runAlgorithms({ shouldShowDetails, algorithmsToRun, memoryInitalState, actionsQueue, pagesQueue, clockInterruption });

  res.send(response);
}