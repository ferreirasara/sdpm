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
}