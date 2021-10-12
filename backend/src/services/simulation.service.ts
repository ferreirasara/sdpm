import { AlgorithmResult, SimulationData, SimulationResponse } from "../utils/types"
import { fifoAlgorithm } from "./fifoAlgorithm"
import { lruAlgorithm } from "./lruAlgorithm"
import { nruAlgorithm } from "./nruAlgorithm"
import { optimalAlgorithm } from "./optimalAlgorithm"
import { secondChanceAlgorithm } from "./secondChanceAlgorithm"
import { wsClockAlgorithm } from "./wsClockAlgorithm"

export const simulateService = async (req: any, res: any, next: any) => {
  const body: SimulationData = req.body
  const algorithmsToRun: string[] = body.algorithms

  const algorithmResult = []
  const memory = body.memoryInitalState.split('|');
  const pagesQueue = body.pagesQueue.split('|');
  const shouldSentDetails = body.memorySize <= 5 && body.numberOfPages <= 10 && pagesQueue.length <= 15

  const start = new Date().getTime();

  if (algorithmsToRun.includes('optimalAlgorithm')) {
    const optimalAlgorithmResult: AlgorithmResult = optimalAlgorithm(memory, pagesQueue, shouldSentDetails);
    algorithmResult.push(optimalAlgorithmResult)
  }

  if (algorithmsToRun.includes('fifoAlgorithm')) {
    const fifoAlgorithmResult: AlgorithmResult = fifoAlgorithm(memory, pagesQueue, shouldSentDetails)
    algorithmResult.push(fifoAlgorithmResult)
  }

  if (algorithmsToRun.includes('secondChanceAlgorithm')) {
    const secondChanceAlgorithmResult: AlgorithmResult = secondChanceAlgorithm()
    algorithmResult.push(secondChanceAlgorithmResult)
  }

  if (algorithmsToRun.includes('lruAlgorithm')) {
    const lruAlgorithmResult: AlgorithmResult = lruAlgorithm()
    algorithmResult.push(lruAlgorithmResult)
  }

  if (algorithmsToRun.includes('nruAlgorithm')) {
    const nruAlgorithmResult: AlgorithmResult = nruAlgorithm()
    algorithmResult.push(nruAlgorithmResult)
  }

  if (algorithmsToRun.includes('wsClockAlgorithm')) {
    const wsClockAlgorithmResult: AlgorithmResult = wsClockAlgorithm()
    algorithmResult.push(wsClockAlgorithmResult)
  }

  const end = new Date().getTime();
  const simulationTime = end - start;

  const response: SimulationResponse = {
    success: true,
    message: 'Simulation completed successfully.',
    algorithmResult,
    simulationTime,
    shouldShowDetails: shouldSentDetails,
  }

  res.send(response)
}