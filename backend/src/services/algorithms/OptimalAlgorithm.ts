import { AlgorithmResult, FindPageToReplaceArgs, RunArgs, SimulationExecution } from "../../utils/types";
import Memory from "../Memory";
import AlgorithmInterface from "../AlgorithmInterface";

export default class OptimalAlgorithm extends AlgorithmInterface {
  protected memory: Memory

  constructor(args: { algorithmName: string, memoryInitalState: string[] }) {
    const { algorithmName, memoryInitalState } = args;
    super({ algorithmName });
    this.memory = new Memory({ memoryInitalState });
  }

  public findPageToReplace(args: FindPageToReplaceArgs): string {
    const { pagesQueue } = args
    const pagesReferences = this.memory.pagesInMemory.map(cur => {
      return {
        pageName: cur.pageName,
        index: pagesQueue?.findIndex((value) => value === cur.pageName)
      }
    });
    const notInQueue = pagesReferences?.find(cur => cur.index - 1);
    if (notInQueue) {
      return notInQueue.pageName;
    } else {
      pagesReferences?.sort((a, b) => a.index - b.index);
      return pagesReferences?.pop()?.pageName || "";
    }
  }

  public run(args: RunArgs): AlgorithmResult {
    const { pagesQueue, actionsQueue, shouldShowDetails } = args;
    const start = new Date().getTime();

    const simulationExecution: SimulationExecution[] = []
    let faults = 0;

    for (let i = 0; i < pagesQueue.length; i++) {
      const pageName = pagesQueue[i]
      const modified = actionsQueue[i] === "E"

      if (this.memory.referencePage(pageName)) {
        if (shouldShowDetails) simulationExecution.push({ fault: false, pageName, action: `A página ${pageName} está na memória.`, memory: this.memory.getPages() })
      } else {
        faults++;
        if (this.memory.hasFreePosition()) {
          this.memory.replacePage(pageName, "0");
          if (shouldShowDetails) simulationExecution.push({ fault: true, pageName, action: `A página ${pageName} foi inserida em uma posição livre da memória.`, memory: this.memory.getPages() })
        } else {
          const pageNameToReplace = this.findPageToReplace({ pagesQueue: pagesQueue.slice(i) });
          this.memory.replacePage(pageName, pageNameToReplace);
          if (shouldShowDetails) simulationExecution.push({ fault: true, pageName, action: `A página ${pageName} foi inserida no lugar da página ${pageNameToReplace}.`, memory: this.memory.getPages() })
        }
      }
      this.memory.setModified(this.memory.findIndex(pageName), modified)
    }
    const end = new Date().getTime();
    const simulationTime = end - start;

    return {
      name: this.algorithmName,
      cont: faults,
      simulationTime,
      simulationExecution,
    }
  }
}