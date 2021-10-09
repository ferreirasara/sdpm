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
  faultsPerAlgorithm?: AlgorithmResult[],
  simulationTime?: number,
}

export interface AlgorithmResult {
  name: string,
  cont: number
}