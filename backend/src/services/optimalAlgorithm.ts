import { AlgorithmResult, SimulationExecution } from "../utils/types"
import { replacePage } from "./common";
import { cloneDeep } from 'lodash'

const findPageToReplace = (memory: string[], pagesQueue: string[]) => {
  const pagesReferences: string[] = [];
  for (let i = 0; i < pagesQueue.length; i++) {
    if (memory.includes(pagesQueue[i]) && !pagesReferences.includes(pagesQueue[i])) pagesReferences.push(pagesQueue[i]);
  }
  return pagesReferences.pop();
}

export const optimalAlgorithm = (memoryInitalState: string[], pagesQueue: string[], shouldSentDetails: boolean): AlgorithmResult => {
  let memory: string[] = cloneDeep(memoryInitalState);
  let faults = 0;
  const simulationExecution: SimulationExecution[] = []

  for (let i = 0; i < pagesQueue.length; i++) {
    if (!memory.includes(pagesQueue[i])) {
      faults++;
      if (memory.includes('0')) {
        memory = replacePage(memory, pagesQueue[i], '0');

        if (shouldSentDetails) simulationExecution.push({
          page: pagesQueue[i],
          memory: memory.join('|'),
          fault: true,
          action: `Página ${pagesQueue[i]} inserida em uma posição livre da memória.`
        })
      } else {
        const pageToReplace = findPageToReplace(memory, pagesQueue) || '';
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

  return { name: 'optimalAlgorithm', cont: faults, simulationExecution }
}