import { RunArgs } from "../utils/types";
import FIFOAlgorithm from "../services/algorithms/FIFOAlgorithm";
import LRUAlgorithm from "../services/algorithms/LRUAlgorithm";
import NRUAlgorithm from "../services/algorithms/NRUAlgorithm";
import OptimalAlgorithm from "../services/algorithms/OptimalAlgorithm";
import SecondChanceAlgorithm from "../services/algorithms/SecondChanceAlgorithm";
import WSClockAlgorithm from "../services/algorithms/WSClockAlgorithm";

describe(`Tests FIFOAlgorithm`, () => {
  it(``, () => {
    const memoryInitalState = ["0","0","0"];
    const runArgs: RunArgs = {
      memoryInitalState,
      actionsQueue: ["E", "E", "L", "E", "E", "L", "E", "L", "L", "L", "L", "E", "E"],
      pagesQueue: ["A1", "A2", "A3", "A2", "A3", "B2", "B3", "A1", "A2", "A3", "A2", "A1", "A3"],
      clockInterruption: 3,
      shouldShowDetails: false,
      memorySize: 3,
    };
    const res = new FIFOAlgorithm({ algorithmName: "fifoAlgorithm", memoryInitalState }).run(runArgs);
    expect(res.cont).toBe(8);
  });
});

describe(`Tests LRUAlgorithm`, () => {
  it(``, () => {
    const memoryInitalState = ["0","0","0"];
    const memorySize = 3;
    const runArgs: RunArgs = {
      memoryInitalState,
      actionsQueue: ["E", "E", "L", "E", "E", "L", "E", "L", "L", "L", "L", "E", "E"],
      pagesQueue: ["A1", "A2", "A3", "A2", "A3", "B2", "B3", "A1", "A2", "A3", "A2", "A1", "A3"],
      clockInterruption: 3,
      shouldShowDetails: false,
      memorySize,
    };
    const res = new LRUAlgorithm({ algorithmName: "fifoAlgorithm", memoryInitalState, memorySize }).run(runArgs);
    expect(res.cont).toBe(6);
  });
});

describe(`Tests NRUAlgorithm`, () => {
  it(``, () => {
    const memoryInitalState = ["0","0","0"];
    const runArgs: RunArgs = {
      memoryInitalState,
      actionsQueue: ["E", "E", "L", "E", "E", "L", "E", "L", "L", "L", "L", "E", "E"],
      pagesQueue: ["A1", "A2", "A3", "A2", "A3", "B2", "B3", "A1", "A2", "A3", "A2", "A1", "A3"],
      clockInterruption: 3,
      shouldShowDetails: false,
      memorySize: 3,
    };
    const res = new NRUAlgorithm({ algorithmName: "fifoAlgorithm", memoryInitalState }).run(runArgs);
    expect(res.cont).toBe(9);
  });
});

describe(`Tests OptimalAlgorithm`, () => {
  it(``, () => {
    const memoryInitalState = ["0","0","0"];
    const runArgs: RunArgs = {
      memoryInitalState,
      actionsQueue: ["E", "E", "L", "E", "E", "L", "E", "L", "L", "L", "L", "E", "E"],
      pagesQueue: ["A1", "A2", "A3", "A2", "A3", "B2", "B3", "A1", "A2", "A3", "A2", "A1", "A3"],
      clockInterruption: 3,
      shouldShowDetails: false,
      memorySize: 3,
    };
    const res = new OptimalAlgorithm({ algorithmName: "fifoAlgorithm", memoryInitalState }).run(runArgs);
    expect(res.cont).toBe(6);
  });
});

describe(`Tests SecondChanceAlgorithm`, () => {
  it(``, () => {
    const memoryInitalState = ["0","0","0"];
    const runArgs: RunArgs = {
      memoryInitalState,
      actionsQueue: ["E", "E", "L", "E", "E", "L", "E", "L", "L", "L", "L", "E", "E"],
      pagesQueue: ["A1", "A2", "A3", "A2", "A3", "B2", "B3", "A1", "A2", "A3", "A2", "A1", "A3"],
      clockInterruption: 3,
      shouldShowDetails: false,
      memorySize: 3,
    };
    const res = new SecondChanceAlgorithm({ algorithmName: "fifoAlgorithm", memoryInitalState }).run(runArgs);
    expect(res.cont).toBe(8);
  });
});

describe(`Tests WSClockAlgorithm`, () => {
  it(``, () => {
    const memoryInitalState = ["0","0","0"];
    const tau = 3;
    const runArgs: RunArgs = {
      memoryInitalState,
      actionsQueue: ["E", "E", "L", "E", "E", "L", "E", "L", "L", "L", "L", "E", "E"],
      pagesQueue: ["A1", "A2", "A3", "A2", "A3", "B2", "B3", "A1", "A2", "A3", "A2", "A1", "A3"],
      clockInterruption: 3,
      shouldShowDetails: false,
      memorySize: 3,
    };
    const res = new WSClockAlgorithm({ algorithmName: "fifoAlgorithm", memoryInitalState, tau }).run(runArgs);
    expect(res.cont).toBe(9);
  });
});