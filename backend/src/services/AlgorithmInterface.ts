import { AlgorithmInterfaceArgs, AlgorithmResult, FindPageToReplaceArgs, RunArgs } from "../utils/types";

export default abstract class AlgorithmInterface {
  protected algorithmName: string

  constructor(args: AlgorithmInterfaceArgs) {
    const { algorithmName } = args;
    this.algorithmName = algorithmName;
  }

  public abstract findPageToReplace(args: FindPageToReplaceArgs): string
  public abstract run(args: RunArgs): AlgorithmResult
}