export interface SimulationData {
  memorySize?: number;
  pagesQueueSize?: number;
  numberOfPages?: number;
  pages?: string[];
  pagesQueue?: string;
  actionsQueue?: string;
  memoryInitalState?: string;
  clockInterruption?: number;
  tau?: number;
  algorithms?: string[];
}

export interface SimulationResponse {
  success?: boolean,
  message?: string,
  algorithmResult?: AlgorithmResult[],
  simulationTotalTime?: number,
  shouldShowDetails?: boolean,
}

export interface AlgorithmResult {
  name: string,
  cont: number,
  simulationTime: number,
  simulationExecution?: SimulationExecution[]
}

export interface SimulationExecution {
  pageName?: string,
  memory?: Page[],
  fault?: boolean,
  action: string,
}

export interface Page {
  pageName: string,
  referenced: boolean,
  modified: boolean,
  timeInMemory: number,
}

export interface SimulationHistory {
  succes: boolean,
  data: {
    date?: string,
    memorySize?: number,
    pagesQueueSize?: number,
    optimalAlgorithm?: number,
    fifoAlgorithm?: number,
    secondChanceAlgorithm?: number,
    lruAlgorithm?: number,
    nruAlgorithm?: number,
    wsClockAlgorithm?: number,
  }[],
}

export interface SimulationStats {
  succes: boolean,
  data: {
    totalOfSimulations?: number,
    totalOfTime?: number,
  },
}

export interface SimulationsRating {
  succes: boolean,
  data: {
    ratingDate: string,
    rating: number,
    comment?: string
  }[],
}