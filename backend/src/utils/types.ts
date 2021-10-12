export interface SimulationData {
  memorySize: number;
  pagesQueueSize: number;
  numberOfPages: number;
  pages: string[];
  pagesQueue: string;
  memoryInitalState: string;
  tau: number;
  // clockInterruption: number;
  algorithms: string[];
}

export interface SimulationResponse {
  success: boolean,
  message: string,
  algorithmResult?: AlgorithmResult[],
  simulationTime?: number,
  shouldShowDetails?: boolean,
}

export interface AlgorithmResult {
  name: string,
  cont: number
  simulationExecution?: SimulationExecution[]
}

export interface SimulationExecution {
  page: string,
  memory: string,
  fault: boolean,
  action: string,
}