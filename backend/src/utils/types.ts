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

export interface MemoryArgs {
  memoryInitalState: string[]
}

export interface Page {
  pageName: string,
  referenced: boolean,
  modified: boolean,
  timeInMemory: number,
}

export interface AlgorithmInterfaceArgs {
  algorithmName: string
}

export interface AlgorithmRunnerArgs {
  algorithmsToRun: string[]
  shouldShowDetails: boolean
  memoryInitalState: string[]
  pagesQueue: string[]
  actionsQueue: string[]
  clockInterruption: number
  memorySize: number
  tau: number
}

export interface FindPageToReplaceArgs {
  pagesQueue: string[]
}

export interface RunArgs {
  memoryInitalState: string[]
  pagesQueue: string[]
  actionsQueue: string[]
  clockInterruption: number
  shouldShowDetails: boolean
  memorySize: number
}