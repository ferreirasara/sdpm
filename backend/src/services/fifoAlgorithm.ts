import { cloneDeep } from "lodash";
import { AlgorithmResult } from "../utils/types"
import { replacePage } from "./common";

export const fifoAlgorithm = (memoryInitalState: string[], pagesQueue: string[]): AlgorithmResult => {
  let memory: string[] = cloneDeep(memoryInitalState);
  const fifoQueue: string[] = memory.filter(cur => cur !== '0');
  let faults: number = 0;
  for (let i = 0; i < pagesQueue.length; i++) {
    if (pagesQueue[i] !== '#') {
      if (!memory.includes(pagesQueue[i])) {
        faults++;
        if (memory.includes('0')) {
          memory = replacePage(memory, pagesQueue[i], '0');
          fifoQueue.unshift(pagesQueue[i]);
        } else {
          const pageToReplace: string = fifoQueue.pop() || '';
          fifoQueue.unshift(pagesQueue[i]);
          memory = replacePage(memory, pagesQueue[i], pageToReplace);
        };
      }
    }
  }

  return { name: 'fifoAlgorithm', cont: faults }
}