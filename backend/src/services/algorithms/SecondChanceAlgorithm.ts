import { AlgorithmResult, RunArgs, SimulationExecution } from "../../utils/types";
import Memory from "../Memory";
import AlgorithmInterface from "../AlgorithmInterface";

export default class SecondChanceAlgorithm extends AlgorithmInterface {
  protected fifoQueue: string[]
  protected memory: Memory

  constructor(args: { memoryInitalState: string[] }) {
    const { memoryInitalState } = args;
    super({ algorithmName: 'secondChanceAlgorithm' })
    this.fifoQueue = [];
    memoryInitalState.filter(cur => cur !== "0").map(cur => this.fifoQueue.unshift(cur));
    this.memory = new Memory({ memoryInitalState });
  }

  public findPageToReplace(): string {
    while (true) {
      const pageName = this.fifoQueue.pop() || "";
      if (!this.memory.pageIsReferenced(pageName)) return pageName || "";
      this.memory.setReferenced(this.memory.findIndex(pageName), false);
      this.fifoQueue.unshift(pageName);
    }
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
          this.memory.replacePage(pageName, "0", modified);
          this.fifoQueue.unshift(pageName);
          if (shouldShowDetails) simulationExecution.push({ fault: true, pageName, action: `A página ${pageName} foi inserida em uma posição livre da memória.`, memory: this.memory.getPages() })
        } else {
          const pageNameToReplace = this.findPageToReplace();
          this.memory.replacePage(pageName, pageNameToReplace, modified);
          this.fifoQueue.unshift(pageName);
          if (shouldShowDetails) simulationExecution.push({ fault: true, pageName, action: `A página ${pageName} foi inserida no lugar da página ${pageNameToReplace}.`, memory: this.memory.getPages() })
        }
      }
      this.memory.setModified(this.memory.findIndex(pageName), modified);
      if ((i+1) % clockInterruption === 0) {
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
      simulationExecution,
    }
  }
}