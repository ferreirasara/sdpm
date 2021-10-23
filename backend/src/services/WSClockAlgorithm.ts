import { AlgorithmResult, FindPageToReplaceArgs, RunArgs } from "../utils/types";
import AlgorithmInterface from "./AlgorithmInterface";
import Memory from "./Memory";

export default class WSClockAlgorithm extends AlgorithmInterface {
  protected memory: Memory

  constructor(args: { algorithmName: string, memoryInitalState: string[] }) {
    const { algorithmName, memoryInitalState } = args;
    super({ algorithmName });
    this.memory = new Memory({ memoryInitalState });
  }

  public findPageToReplace(args: FindPageToReplaceArgs): string {
    return "";
  }

  public run(args: RunArgs): AlgorithmResult {
    return {
      cont: 0,
      simulationTime: 0,
      name: this.algorithmName,
      simulationExecution: []
    }
  }
}