import { cloneDeep } from "lodash";
import { AlgorithmResult, SimulationExecution } from "../utils/types"
import { replacePage } from "./common";

interface SecondChanceQueue {
  page?: string,
  referenced?: boolean
}

const setNotReferenced = (secondChanceQueue: SecondChanceQueue[]) => {
  for (let i = 0; i < secondChanceQueue.length; i++) {
    secondChanceQueue[i].referenced = false;
  }
}

const findPageToReplace = (secondChanceQueue: SecondChanceQueue[]) => {
  while (true) {
    const firstPage = secondChanceQueue?.pop();
    if (!firstPage?.referenced) {
      return firstPage;
    } else {
      secondChanceQueue.unshift({ page: firstPage?.page, referenced: false })
    }
  }
}

const getPretiffyQueue = (secondChanceQueue: SecondChanceQueue[]): string => {
  return secondChanceQueue.map(cur => cur.page + ' (R=' + cur.referenced + ')').join(' | ')
}

export const secondChanceAlgorithm = (memoryInitalState: string[], pagesQueue: string[], clockInterruption: number, shouldSentDetails: boolean): AlgorithmResult => {
  let memory: string[] = cloneDeep(memoryInitalState);
  let secondChanceQueue: SecondChanceQueue[] = memory.filter(cur => cur !== '0').map(cur => { return { page: cur, referenced: true } });
  let faults: number = 0;
  const simulationExecution: SimulationExecution[] = []

  for (let i = 0; i < pagesQueue.length; i++) {
    if (!memory.includes(pagesQueue[i])) {
      faults++;
      if (memory.includes('0')) {
        memory = replacePage(memory, pagesQueue[i], '0');
        secondChanceQueue.unshift({ page: pagesQueue[i], referenced: true })

        if (shouldSentDetails) simulationExecution.push({
          page: pagesQueue[i],
          memory: memory.join(' | '),
          fault: true,
          queue: getPretiffyQueue(secondChanceQueue),
          action: `Página ${pagesQueue[i]} inserida em uma posição livre da memória.`
        })
      } else {
        const pageToReplace: SecondChanceQueue | undefined = findPageToReplace(secondChanceQueue);
        secondChanceQueue.unshift({ page: pagesQueue[i], referenced: true })
        memory = replacePage(memory, pagesQueue[i], pageToReplace?.page || '');

        if (shouldSentDetails) simulationExecution.push({
          page: pagesQueue[i],
          memory: memory.join(' | '),
          fault: true,
          queue: getPretiffyQueue(secondChanceQueue),
          action: `Página ${pagesQueue[i]} inserida no lugar da página ${pageToReplace?.page}.`
        })
      }
    } else {
      if (shouldSentDetails) simulationExecution.push({
        page: pagesQueue[i],
        memory: memory.join(' | '),
        fault: false,
        queue: getPretiffyQueue(secondChanceQueue),
        action: `Página ${pagesQueue[i]} está na memória.`
      })
    }
    if (i % clockInterruption === 0) {
      setNotReferenced(secondChanceQueue);
      if (shouldSentDetails) simulationExecution.push({
        queue: getPretiffyQueue(secondChanceQueue),
        action: `Bit R resetado.`
      })
    }
  }

  return { name: 'secondChanceAlgorithm', cont: faults, simulationExecution }
}