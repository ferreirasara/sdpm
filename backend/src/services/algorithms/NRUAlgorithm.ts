import { AlgorithmResult, RunArgs, SimulationExecution } from "../../utils/types";
import Memory from "../Memory";
import AlgorithmInterface from "../AlgorithmInterface";

export default class NRUAlgorithm extends AlgorithmInterface {
  protected memory: Memory

  constructor(args: { algorithmName: string, memoryInitalState: string[] }) {
    const { algorithmName, memoryInitalState } = args;
    super({ algorithmName });
    this.memory = new Memory({ memoryInitalState });
  }

  private getPageClass(pageName: string): number {
    if (!this.memory.pageIsReferenced(pageName) && !this.memory.pageIsModified(pageName)) return 0;
    if (!this.memory.pageIsReferenced(pageName) && this.memory.pageIsModified(pageName)) return 1;
    if (this.memory.pageIsReferenced(pageName) && !this.memory.pageIsModified(pageName)) return 2;
    if (this.memory.pageIsReferenced(pageName) && this.memory.pageIsModified(pageName)) return 3;
    return 0;
  }

  public findPageToReplace(): string {
    const pageList = this.memory.pagesInMemory.map(cur => { return { pageName: cur.pageName, class: this.getPageClass(cur.pageName) } });
    pageList.sort((a, b) => a.class - b.class);
    return pageList[0].pageName;
  }

  public run(args: RunArgs): AlgorithmResult {
    const { pagesQueue, actionsQueue, clockInterruption, shouldShowDetails } = args;
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
          const pageNameToReplace = this.findPageToReplace();
          this.memory.replacePage(pageName, pageNameToReplace);
          if (shouldShowDetails) simulationExecution.push({ fault: true, pageName, action: `A página ${pageName} foi inserida no lugar da página ${pageNameToReplace}.`, memory: this.memory.getPages() })
        }
      }
      this.memory.setModified(this.memory.findIndex(pageName), modified);
      if ((i + 1) % clockInterruption === 0) {
        this.memory.resetReferenced();
        if (shouldShowDetails) simulationExecution.push({ action: `Bit R resetado.`, memory: this.memory.getPages() });
      }
    }
    const end = new Date().getTime();
    const simulationTime = end - start;

    return {
      name: this.algorithmName,
      cont: faults,
      simulationTime,
      simulationExecution
    }
  }
}