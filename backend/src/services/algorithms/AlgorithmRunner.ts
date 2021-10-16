import { AlgorithmResult, AlgorithmRunnerArgs, SimulationResponse } from "../../utils/types"
import FIFOAlgorithm from "./fifoAlgorithm";
import LRUAlgorithm from "./lruAlgorithm";
import NRUAlgorithm from "./nruAlgorithm";
import OptimalAlgorithm from "./OptimalAlgorithm";
import SecondChanceAlgorithm from "./secondChanceAlgorithm";
import WSClockAlgorithm from "./wsClockAlgorithm";

export default class AlgorithmRunner {
  public static runAlgorithms = (args: AlgorithmRunnerArgs): SimulationResponse => {
    const { actionsQueue, pagesQueue, memoryInitalState, algorithmsToRun, shouldSentDetails, clockInterruption } = args;
    const algorithmResult: AlgorithmResult[] = []

    try {
      const start = new Date().getTime();
  
      if (algorithmsToRun.includes('optimalAlgorithm'))
        algorithmResult.push(new OptimalAlgorithm({ algorithmName: 'optimalAlgorithm' }).run({ memoryInitalState, actionsQueue, pagesQueue, clockInterruption }))
  
      if (algorithmsToRun.includes('fifoAlgorithm'))
        algorithmResult.push(new FIFOAlgorithm({ algorithmName: 'fifoAlgorithm', memoryInitalState }).run({ memoryInitalState, actionsQueue, pagesQueue, clockInterruption }))
  
      if (algorithmsToRun.includes('secondChanceAlgorithm'))
        algorithmResult.push(new SecondChanceAlgorithm({ algorithmName: 'secondChanceAlgorithm', memoryInitalState }).run({ memoryInitalState, actionsQueue, pagesQueue, clockInterruption }))// }
  
      // if (algorithmsToRun.includes('lruAlgorithm'))
      //   algorithmResult.push(new LRUAlgorithm({ algorithmName: 'lruAlgorithm' }).run({ memoryInitalState, actionsQueue, pagesQueue }))// }
  
      // if (algorithmsToRun.includes('nruAlgorithm'))
      //   algorithmResult.push(new NRUAlgorithm({ algorithmName: 'nruAlgorithm' }).run({ memoryInitalState, actionsQueue, pagesQueue }))// }
  
      // if (algorithmsToRun.includes('wsClockAlgorithm'))
      //   algorithmResult.push(new WSClockAlgorithm({ algorithmName: 'wsClockAlgorithm' }).run({ memoryInitalState, actionsQueue, pagesQueue }))// }
  
      const end = new Date().getTime();
      const simulationTime = end - start;
  
      return {
        success: true,
        message: 'Simulation completed successfully.',
        algorithmResult,
        simulationTime,
        shouldShowDetails: shouldSentDetails,
      }
    } catch (error) {
      console.log(error)
      return {
        success: false,
        message: `Erro: ${(error as Error).message}`,
      }
    }
  }
}