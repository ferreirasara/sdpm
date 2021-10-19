import { AlgorithmResult, FindPageToReplaceArgs, RunArgs, SimulationExecution } from "../../utils/types";
import Memory from "../Memory";
import AlgorithmInterface from "./algorithmInterface";

export default class OptimalAlgorithm extends AlgorithmInterface {
  constructor(args: { algorithmName: string }) {
    const { algorithmName } = args;
    super({ algorithmName })
  }

  public findPageToReplace(args: FindPageToReplaceArgs): string {
    const { memory, pagesQueue } = args
    const pagesReferences = memory.pagesInMemory.map(cur => {
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
      return pagesReferences?.pop()?.pageName || '';
    }
  }

  public run(args: RunArgs): AlgorithmResult {
    const { pagesQueue, memoryInitalState, actionsQueue } = args;
    const start = new Date().getTime();

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
          const pageNameToReplace = this.findPageToReplace({ memory, pagesQueue: pagesQueue.slice(i) });
          memory.replacePage(pageName, pageNameToReplace);
          simulationExecution.push({ fault: true, pageName, action: `A página ${pageName} foi inserida no lugar da página ${pageNameToReplace}.`, memory: memory.getPages() })
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