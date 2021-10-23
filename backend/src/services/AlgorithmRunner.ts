import { AlgorithmResult, AlgorithmRunnerArgs, RunArgs, SimulationResponse } from "../utils/types"
import FIFOAlgorithm from "./FIFOAlgorithm";
import LRUAlgorithm from "./LRUAlgorithm";
import NRUAlgorithm from "./NRUAlgorithm";
import OptimalAlgorithm from "./OptimalAlgorithm";
import SecondChanceAlgorithm from "./SecondChanceAlgorithm";
import WSClockAlgorithm from "./WSClockAlgorithm";

export default class AlgorithmRunner {
  public static runAlgorithms = (args: AlgorithmRunnerArgs): SimulationResponse => {
    const { actionsQueue, pagesQueue, memoryInitalState, algorithmsToRun, shouldShowDetails, clockInterruption, memorySize } = args;
    const algorithmResult: AlgorithmResult[] = []

    const runArgs: RunArgs = {
      memoryInitalState,
      actionsQueue,
      pagesQueue,
      clockInterruption,
      shouldShowDetails,
      memorySize,
    };

    try {
      if (algorithmsToRun.includes("optimalAlgorithm"))
        algorithmResult.push(new OptimalAlgorithm({ algorithmName: "optimalAlgorithm", memoryInitalState }).run(runArgs));

      if (algorithmsToRun.includes("fifoAlgorithm"))
        algorithmResult.push(new FIFOAlgorithm({ algorithmName: "fifoAlgorithm", memoryInitalState }).run(runArgs));

      if (algorithmsToRun.includes("secondChanceAlgorithm"))
        algorithmResult.push(new SecondChanceAlgorithm({ algorithmName: "secondChanceAlgorithm", memoryInitalState }).run(runArgs));

      if (algorithmsToRun.includes("lruAlgorithm"))
        algorithmResult.push(new LRUAlgorithm({ algorithmName: "lruAlgorithm", memoryInitalState, memorySize }).run(runArgs));

      if (algorithmsToRun.includes("nruAlgorithm"))
        algorithmResult.push(new NRUAlgorithm({ algorithmName: "nruAlgorithm", memoryInitalState }).run(runArgs));

      // if (algorithmsToRun.includes("wsClockAlgorithm"))
      //   algorithmResult.push(new WSClockAlgorithm({ algorithmName: "wsClockAlgorithm", memoryInitalState }).run(runArgs));

      const simulationTotalTime = algorithmResult.reduce((cur, prev) => cur + prev.simulationTime, 0);

      return {
        success: true,
        message: "Simulation completed successfully.",
        algorithmResult,
        simulationTotalTime,
        shouldShowDetails,
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