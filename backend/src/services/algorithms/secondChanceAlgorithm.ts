import { AlgorithmResult, FindPageToReplaceArgs, RunArgs, SimulationExecution } from "../../utils/types";
import Memory from "../Memory";
import AlgorithmInterface from "./algorithmInterface";

export default class SecondChanceAlgorithm extends AlgorithmInterface {
  protected fifoQueue: string[]

  constructor(args: { algorithmName: string, memoryInitalState: string[] }) {
    const { algorithmName, memoryInitalState } = args;
    super({ algorithmName })
    this.fifoQueue = memoryInitalState.filter(cur => cur !== '0');
  }

  public findPageToReplace(args: FindPageToReplaceArgs): string {
    const { memory } = args
    while (true) {
      const pageName = this.fifoQueue.pop() || '';
      if (!memory.pageIsReferenced(pageName)) return pageName || '';
      memory.setReferenced(memory.findIndex(pageName), false);
      this.fifoQueue.unshift(pageName);
    }
  }

  public run(args: RunArgs): AlgorithmResult {
    const { pagesQueue, memoryInitalState, actionsQueue, clockInterruption, shouldShowDetails } = args;
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
          this.fifoQueue.unshift(pageName);
          if (shouldShowDetails) simulationExecution.push({ fault: true, pageName, action: `A página ${pageName} foi inserida em uma posição livre da memória.`, memory: memory.getPages() })
        } else {
          const pageNameToReplace = this.findPageToReplace({ memory, pagesQueue });
          memory.replacePage(pageName, pageNameToReplace);
          this.fifoQueue.unshift(pageName);
          if (shouldShowDetails) simulationExecution.push({ fault: true, pageName, action: `A página ${pageName} foi inserida no lugar da página ${pageNameToReplace}.`, memory: memory.getPages() })
        }
      }
      memory.setModified(memory.findIndex(pageName), modified);
      if ((i+1) % clockInterruption === 0) {
        memory.resetReferenced();
        if (shouldShowDetails) simulationExecution.push({ action: `Bit R resetado.`, memory: memory.getPages() });
      }
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