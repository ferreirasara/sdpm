import { AlgorithmResult, RunArgs, SimulationExecution } from "../../utils/types";
import AlgorithmInterface from "../AlgorithmInterface";
import Memory from "../Memory";

export default class LRUAlgorithm extends AlgorithmInterface {
  protected matrix: number[][]
  protected memorySize: number
  protected memory: Memory

  constructor(args: { memoryInitalState: string[], memorySize: number }) {
    const { memoryInitalState, memorySize } = args;
    super({ algorithmName: 'lruAlgorithm' });

    this.memory = new Memory({ memoryInitalState });

    this.memorySize = memorySize;
    this.matrix = [];

    for (let line = 0; line < this.memorySize; line++) {
      const line: number[] = [];
      for (let column = 0; column < this.memorySize; column++) {
        line.push(0);
      }
      this.matrix.push(line);
    }
  }

  protected referencePage(pageIndex: number) {
    // line = 1
    for (let column = 0; column < this.memorySize; column++) {
      this.matrix[pageIndex][column] = 1;
    }
    // column = 0
    for (let line = 0; line < this.memorySize; line++) {
      this.matrix[line][pageIndex] = 0;
    }
  }

  public findPageToReplace(): string {
    let min = 99999999;
    let indexPageToReplace = 0;
    for (let line = 0; line < this.memorySize; line++) {
      const value = parseInt(this.matrix[line].join(''), 2);
      if (value < min) {
        min = value;
        indexPageToReplace = line;
      }
    }
    return this.memory.findPageByIndex(indexPageToReplace);
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
        if (shouldShowDetails) simulationExecution.push({ fault: false, pageName, action: `A página ${pageName} está na memória.`, memory: this.memory.getPages() });
      } else {
        faults++;
        if (this.memory.hasFreePosition()) {
          this.memory.replacePage(pageName, "0", modified);
          if (shouldShowDetails) simulationExecution.push({ fault: true, pageName, action: `A página ${pageName} foi inserida em uma posição livre da memória.`, memory: this.memory.getPages() })
        } else {
          const pageNameToReplace = this.findPageToReplace();
          this.memory.replacePage(pageName, pageNameToReplace, modified);
          if (shouldShowDetails) simulationExecution.push({ fault: true, pageName, action: `A página ${pageName} foi inserida no lugar da página ${pageNameToReplace}.`, memory: this.memory.getPages() })
        }
      }
      this.referencePage(this.memory.findIndex(pageName));
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