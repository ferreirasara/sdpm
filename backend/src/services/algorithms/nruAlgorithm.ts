import { AlgorithmResult, FindPageToReplaceArgs, RunArgs, SimulationExecution } from "../../utils/types";
import Memory from "../Memory";
import AlgorithmInterface from "./algorithmInterface";

export default class NRUAlgorithm extends AlgorithmInterface {
  constructor(args: { algorithmName: string }) {
    const { algorithmName } = args;
    super({ algorithmName })
  }

  private getPageClass(memory: Memory, pageName: string): number {
    if (!memory.pageIsReferenced(pageName) && !memory.pageIsModified(pageName)) return 0;
    if (!memory.pageIsReferenced(pageName) && memory.pageIsModified(pageName)) return 1;
    if (memory.pageIsReferenced(pageName) && !memory.pageIsModified(pageName)) return 2;
    if (memory.pageIsReferenced(pageName) && memory.pageIsModified(pageName)) return 3;
    return 0;
  }

  public findPageToReplace(args: FindPageToReplaceArgs): string {
    const { memory } = args;
    const pageList = memory.pagesInMemory.map(cur => { return { pageName: cur.pageName, class: this.getPageClass(memory, cur.pageName) } });
    pageList.sort((a, b) => a.class - b.class);
    return pageList[0].pageName;
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
        } else {
          const pageNameToReplace = this.findPageToReplace({ memory, pagesQueue });
          memory.replacePage(pageName, pageNameToReplace);
          simulationExecution.push({ fault: true, pageName, action: `A página ${pageName} foi inserida no lugar da página ${pageNameToReplace}.`, memory: memory.getPages() })
        }
      }
      memory.setModified(memory.findIndex(pageName), modified);
      if ((i + 1) % clockInterruption === 0) {
        memory.resetReferenced();
        simulationExecution.push({ action: `Bit R resetado.`, memory: memory.getPages() });
      }
    }

    return {
      cont: faults,
      name: this.algorithmName,
      simulationExecution
    }
  }
}