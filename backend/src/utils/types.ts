import Memory from "../services/Memory";

export interface SimulationData {
  memorySize: number;
  pagesQueueSize: number;
  numberOfPages: number;
  pages: string[];
  pagesQueue: string;
  actionsQueue: string;
  memoryInitalState: string;
  tau: number;
  clockInterruption: number;
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
  pageName?: string,
  memory?: string,
  fault?: boolean,
  action: string,
}

export interface MemoryArgs {
  memoryInitalState: string[]
}

export interface AlgorithmInterfaceArgs {
  algorithmName: string
}

export interface AlgorithmRunnerArgs {
  algorithmsToRun: string[]
  shouldSentDetails: boolean
  memoryInitalState: string[]
  pagesQueue: string[]
  actionsQueue: string[]
  clockInterruption: number
}

export interface FindPageToReplaceArgs {
  memory: Memory
  pagesQueue: string[]
}

export interface RunArgs {
  memoryInitalState: string[]
  pagesQueue: string[]
  actionsQueue: string[]
  clockInterruption: number
}