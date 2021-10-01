export interface SimulationData {
  memorySize: number;
  pagesQueueSize: number;
  numberOfPages: number;
  pages: string[];
  pagesQueue: string;
  memoryInitalState: string;
  tau: number;
  clockInterruption: number;
  algorithms: string[];
}

export interface SimuationResponse {
  success: boolean,
  faultsPerAlgorithm: {
    name: string,
    cont: number
  }[],
  simulationTime: number,
}