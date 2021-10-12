import { cloneDeep } from "lodash";
import { AlgorithmResult, SimulationExecution } from "../utils/types"
import { replacePage } from "./common";

export const fifoAlgorithm = (memoryInitalState: string[], pagesQueue: string[], shouldSentDetails: boolean): AlgorithmResult => {
  let memory: string[] = cloneDeep(memoryInitalState);
  const fifoQueue: string[] = memory.filter(cur => cur !== '0');
  let faults: number = 0;
  const simulationExecution: SimulationExecution[] = []

  for (let i = 0; i < pagesQueue.length; i++) {
    if (!memory.includes(pagesQueue[i])) {
      faults++;
      if (memory.includes('0')) {
        memory = replacePage(memory, pagesQueue[i], '0');
        fifoQueue.unshift(pagesQueue[i]);

        if (shouldSentDetails) simulationExecution.push({
          page: pagesQueue[i],
          memory: memory.join('|'),
          fault: true,
          action: `Página ${pagesQueue[i]} inserida em uma posição livre da memória.`
        })
      } else {
        const pageToReplace: string = fifoQueue.pop() || '';
        fifoQueue.unshift(pagesQueue[i]);
        memory = replacePage(memory, pagesQueue[i], pageToReplace);

        if (shouldSentDetails) simulationExecution.push({
          page: pagesQueue[i],
          memory: memory.join('|'),
          fault: true,
          action: `Página ${pagesQueue[i]} inserida no lugar da página ${pageToReplace}.`
        })
      };
    } else {
      if (shouldSentDetails) simulationExecution.push({
        page: pagesQueue[i],
        memory: memory.join('|'),
        fault: false,
        action: `Página ${pagesQueue[i]} está na memória.`
      })
    }
  }

  return { name: 'fifoAlgorithm', cont: faults, simulationExecution }
}