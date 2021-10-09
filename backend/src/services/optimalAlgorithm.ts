import { AlgorithmResult } from "../utils/types"
import { replacePage } from "./common";
import { cloneDeep } from 'lodash'

const findPageToReplace = (memory: string[], pagesQueue: string[]) => {
  const pagesReferences: string[] = [];
  for (let i = 0; i < pagesQueue.length; i++) {
    if (memory.includes(pagesQueue[i]) && !pagesReferences.includes(pagesQueue[i])) pagesReferences.push(pagesQueue[i]);
  }
  return pagesReferences[pagesReferences.length - 1]
}

export const optimalAlgorithm = (memoryInitalState: string[], pagesQueue: string[]): AlgorithmResult => {
  let memory: string[] = cloneDeep(memoryInitalState);
  let faults = 0;
  for (let i = 0; i < pagesQueue.length; i++) {
    if (pagesQueue[i] !== '#') {
      if (!memory.includes(pagesQueue[i])) {
        faults++;
        if (memory.includes('0')) {
          memory = replacePage(memory, pagesQueue[i], '0');
        } else {
          const pageToReplace = findPageToReplace(memory, pagesQueue);
          memory = replacePage(memory, pagesQueue[i], pageToReplace);
        };
      }
    }
  }

  return { name: 'optimalAlgorithm', cont: faults }
}