import DAO from "../dao/DAO";
import { AlgorithmResult, AlgorithmRunnerArgs, RunArgs, SimulationResponse } from "../utils/types"
import FIFOAlgorithm from "./algorithms/FIFOAlgorithm";
import LRUAlgorithm from "./algorithms/LRUAlgorithm";
import NRUAlgorithm from "./algorithms/NRUAlgorithm";
import OptimalAlgorithm from "./algorithms/OptimalAlgorithm";
import SecondChanceAlgorithm from "./algorithms/SecondChanceAlgorithm";
import WSClockAlgorithm from "./algorithms/WSClockAlgorithm";

export default class AlgorithmRunner {
  public static runAlgorithms = async (args: AlgorithmRunnerArgs): Promise<SimulationResponse> => {
    const { actionsQueue, pagesQueue, memoryInitalState, algorithmsToRun, shouldShowDetails, clockInterruption, memorySize, tau } = args;
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
        algorithmResult.push(new OptimalAlgorithm({ memoryInitalState }).run(runArgs));

      if (algorithmsToRun.includes("fifoAlgorithm"))
        algorithmResult.push(new FIFOAlgorithm({ memoryInitalState }).run(runArgs));

      if (algorithmsToRun.includes("secondChanceAlgorithm"))
        algorithmResult.push(new SecondChanceAlgorithm({ memoryInitalState }).run(runArgs));

      if (algorithmsToRun.includes("lruAlgorithm"))
        algorithmResult.push(new LRUAlgorithm({ memoryInitalState, memorySize }).run(runArgs));

      if (algorithmsToRun.includes("nruAlgorithm"))
        algorithmResult.push(new NRUAlgorithm({ memoryInitalState }).run(runArgs));

      if (algorithmsToRun.includes("wsClockAlgorithm"))
        algorithmResult.push(new WSClockAlgorithm({ memoryInitalState, tau }).run(runArgs));

      const simulationTotalTime = algorithmResult.reduce((cur, prev) => cur + prev.simulationTime, 0);

      try {
        const dao = new DAO();
        await dao.insertSimulationResult({ memorySize, pagesQueueSize: pagesQueue.length, algorithmResult });
      } catch (error) {
        console.log(error);
      }

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