import { AlgorithmResult, RunArgs, SimulationExecution } from "../utils/types";
import AlgorithmInterface from "./AlgorithmInterface";
import Memory from "./Memory";

export default class FIFOAlgorithm extends AlgorithmInterface {
  protected fifoQueue: string[]

  constructor(args: { algorithmName: string, memoryInitalState: string[] }) {
    const { algorithmName, memoryInitalState } = args;
    super({ algorithmName })
    this.fifoQueue = memoryInitalState.filter(cur => cur !== '0')
  }

  public findPageToReplace(): string {
    return this.fifoQueue.pop() || '';
  }

  public run(args: RunArgs): AlgorithmResult {
    const { pagesQueue, memoryInitalState, actionsQueue, shouldShowDetails } = args;
    const start = new Date().getTime();

    const memory = new Memory({ memoryInitalState });
    const simulationExecution: SimulationExecution[] = []
    let faults = 0;

    for (let i = 0; i < pagesQueue.length; i++) {
      const pageName = pagesQueue[i]
      const modified = actionsQueue[i] === 'E'

      if (memory.referencePage(pageName)) {
        if (shouldShowDetails) simulationExecution.push({ fault: false, pageName, action: `A página ${pageName} está na memória.`, memory: memory.getPages() })
      } else {
        faults++;
        if (memory.hasFreePosition()) {
          memory.replacePage(pageName, '0');
          if (shouldShowDetails) simulationExecution.push({ fault: true, pageName, action: `A página ${pageName} foi inserida em uma posição livre da memória.`, memory: memory.getPages() })
          this.fifoQueue.unshift(pageName);
        } else {
          const pageNameToReplace = this.findPageToReplace();
          memory.replacePage(pageName, pageNameToReplace);
          if (shouldShowDetails) simulationExecution.push({ fault: true, pageName, action: `A página ${pageName} foi inserida no lugar da página ${pageNameToReplace}.`, memory: memory.getPages() })
          this.fifoQueue.unshift(pageName);
        }
      }
      memory.setModified(memory.findIndex(pageName), modified)
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