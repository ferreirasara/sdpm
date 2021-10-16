import { AlgorithmResult, FindPageToReplaceArgs, RunArgs } from "../../utils/types";
import AlgorithmInterface from "./algorithmInterface";

export default class NRUAlgorithm extends AlgorithmInterface {
  constructor(args: { algorithmName: string }) {
    const { algorithmName } = args;
    super({ algorithmName })
  }

  public findPageToReplace(args: FindPageToReplaceArgs): string {
    return '';
  }

  public run(args: RunArgs): AlgorithmResult {
    return {
      cont: 0,
      name: this.algorithmName,
      simulationExecution: []
    }
  }
}