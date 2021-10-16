import { AlgorithmResult, RunArgs, SimulationExecution } from "../../utils/types";
import Memory from "../Memory";
import AlgorithmInterface from "./algorithmInterface";

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
    const { pagesQueue, memoryInitalState, actionsQueue, clockInterruption } = args;

    const memory = new Memory({ memoryInitalState });
    const simulationExecution: SimulationExecution[] = []
    let faults = 0;

    for (let i = 0; i < pagesQueue.length; i++) {
      const pageName = pagesQueue[i]
      const modified = actionsQueue[i] === 'E'

      if (memory.referencePage(pageName)) {
        simulationExecution.push({ fault: false, pageName, action: `A página ${pageName} está na memória.`, memory: memory.getPages() })
      } else {
        faults++;
        if (memory.hasFreePosition()) {
          memory.replacePage(pageName, '0');
          simulationExecution.push({ fault: true, pageName, action: `A página ${pageName} foi inserida em uma posição livre da memória.`, memory: memory.getPages() })
          this.fifoQueue.unshift(pageName);
        } else {
          const pageNameToReplace = this.findPageToReplace();
          memory.replacePage(pageName, pageNameToReplace);
          simulationExecution.push({ fault: true, pageName, action: `A página ${pageName} foi inserida no lugar da página ${pageNameToReplace}.`, memory: memory.getPages() })
          this.fifoQueue.unshift(pageName);
        }
      }
      memory.setModified(memory.findIndex(pageName), modified)
    }

    return {
      name: this.algorithmName,
      cont: faults,
      simulationExecution,
    }
  }
}