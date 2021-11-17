import FIFOAlgorithm from "../services/algorithms/FIFOAlgorithm";
import LRUAlgorithm from "../services/algorithms/LRUAlgorithm";
import NRUAlgorithm from "../services/algorithms/NRUAlgorithm";
import OptimalAlgorithm from "../services/algorithms/OptimalAlgorithm";
import SecondChanceAlgorithm from "../services/algorithms/SecondChanceAlgorithm";
import WSClockAlgorithm from "../services/algorithms/WSClockAlgorithm";

const testCase1 = {
  memorySize: 5,
  pagesQueueSize: 50,
  numberOfPages: 10,
  pages: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
  pagesQueue: ["F", "I", "J", "G", "I", "B", "C", "F", "C", "B", "E", "A", "G", "E", "C", "C", "G", "I", "F", "E", "D", "G", "I", "A", "B", "I", "A", "H", "B", "E", "B", "H", "J", "C", "F", "G", "G", "E", "G", "D", "J", "J", "C", "I", "E", "H", "B", "B", "C", "I"],
  actionsQueue: ["L", "E", "L", "E", "E", "L", "E", "E", "E", "L", "E", "L", "L", "L", "E", "L", "E", "L", "L", "E", "L", "L", "E", "E", "L", "L", "L", "L", "L", "L", "E", "E", "E", "E", "L", "E", "E", "E", "E", "E", "L", "L", "E", "L", "E", "L", "E", "E", "E", "L"],
  memoryInitalState: ["0", "0", "0", "0", "0"],
  clockInterruption: 3,
  tau: 3,
}

const testCase2 = {
  memorySize: 5,
  pagesQueueSize: 50,
  numberOfPages: 10,
  pages: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
  pagesQueue: ["G", "D", "G", "C", "G", "G", "C", "C", "G", "I", "C", "G", "A", "A", "I", "J", "C", "E", "A", "C", "I", "A", "E", "H", "G", "I", "E", "J", "B", "A", "F", "H", "B", "D", "E", "D", "E", "I", "I", "A", "A", "I", "A", "B", "J", "A", "E", "E", "J", "B"],
  actionsQueue: ["E", "L", "L", "E", "L", "E", "L", "L", "L", "L", "E", "E", "L", "L", "E", "E", "E", "L", "L", "E", "E", "E", "L", "E", "E", "E", "L", "L", "E", "E", "L", "E", "L", "E", "E", "E", "L", "E", "E", "L", "L", "L", "E", "E", "E", "E", "E", "E", "E", "L"],
  memoryInitalState: ["G", "D", "0", "0", "A"],
  clockInterruption: 5,
  tau: 5,
}

const testCase3 = {
  memorySize: 5,
  pagesQueueSize: 50,
  numberOfPages: 10,
  pages: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
  pagesQueue: ["J", "G", "G", "D", "G", "G", "J", "H", "F", "D", "H", "F", "F", "G", "C", "A", "I", "H", "D", "E", "A", "E", "E", "G", "B", "I", "B", "J", "I", "F", "A", "J", "E", "J", "G", "E", "G", "F", "D", "I", "I", "H", "A", "E", "G", "H", "G", "H", "E", "A"],
  actionsQueue: ["L", "E", "E", "L", "L", "L", "E", "E", "E", "E", "L", "L", "E", "L", "E", "L", "E", "L", "L", "E", "L", "E", "L", "E", "E", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "E", "E", "E", "E", "E", "L", "E", "E", "L", "L", "E", "E", "E", "L"],
  memoryInitalState: ["F", "E", "I", "D", "A"],
  clockInterruption: 10,
  tau: 3,
}

describe(`Tests FIFOAlgorithm, test case 1`, () => {
  it(``, () => {
    const result = new FIFOAlgorithm({
      memoryInitalState: testCase1.memoryInitalState,
    }).run({ ...testCase1, shouldShowDetails: true });
    expect(result.name).toBe('fifoAlgorithm');
    expect(result.cont).toBe(25);
    expect(result.simulationExecution?.length).toBeGreaterThan(0);
  });
});

describe(`Tests FIFOAlgorithm, test case 2`, () => {
  it(``, () => {
    const result = new FIFOAlgorithm({
      memoryInitalState: testCase2.memoryInitalState,
    }).run({ ...testCase2, shouldShowDetails: true });
    expect(result.name).toBe('fifoAlgorithm');
    expect(result.cont).toBe(15);
    expect(result.simulationExecution?.length).toBeGreaterThan(0);
  });
});

describe(`Tests FIFOAlgorithm, test case 3`, () => {
  it(``, () => {
    const result = new FIFOAlgorithm({
      memoryInitalState: testCase3.memoryInitalState,
    }).run({ ...testCase3, shouldShowDetails: true });
    expect(result.name).toBe('fifoAlgorithm');
    expect(result.cont).toBe(24);
    expect(result.simulationExecution?.length).toBeGreaterThan(0);
  });
});

describe(`Tests LRUAlgorithm, test case 1`, () => {
  it(``, () => {
    const result = new LRUAlgorithm({
      memoryInitalState: testCase1.memoryInitalState,
      memorySize: testCase1.memorySize,
    }).run({ ...testCase1, shouldShowDetails: true });
    expect(result.name).toBe('lruAlgorithm');
    expect(result.cont).toBe(29);
    expect(result.simulationExecution?.length).toBeGreaterThan(0);
  });
});

describe(`Tests LRUAlgorithm, test case 2`, () => {
  it(``, () => {
    const result = new LRUAlgorithm({
      memoryInitalState: testCase2.memoryInitalState,
      memorySize: testCase2.memorySize,
    }).run({ ...testCase2, shouldShowDetails: true });
    expect(result.name).toBe('lruAlgorithm');
    expect(result.cont).toBe(16);
    expect(result.simulationExecution?.length).toBeGreaterThan(0);
  });
});

describe(`Tests LRUAlgorithm, test case 3`, () => {
  it(``, () => {
    const result = new LRUAlgorithm({
      memoryInitalState: testCase3.memoryInitalState,
      memorySize: testCase3.memorySize,
    }).run({ ...testCase3, shouldShowDetails: true });
    expect(result.name).toBe('lruAlgorithm');
    expect(result.cont).toBe(24);
    expect(result.simulationExecution?.length).toBeGreaterThan(0);
  });
});

describe(`Tests NRUAlgorithm, test case 1`, () => {
  it(``, () => {
    const result = new NRUAlgorithm({
      memoryInitalState: testCase1.memoryInitalState,
    }).run({ ...testCase1, shouldShowDetails: true });
    expect(result.name).toBe('nruAlgorithm');
    expect(result.cont).toBe(28);
    expect(result.simulationExecution?.length).toBeGreaterThan(0);
  });
});

describe(`Tests NRUAlgorithm, test case 2`, () => {
  it(``, () => {
    const result = new NRUAlgorithm({
      memoryInitalState: testCase2.memoryInitalState,
    }).run({ ...testCase2, shouldShowDetails: true });
    expect(result.name).toBe('nruAlgorithm');
    expect(result.cont).toBe(19);
    expect(result.simulationExecution?.length).toBeGreaterThan(0);
  });
});

describe(`Tests NRUAlgorithm, test case 3`, () => {
  it(``, () => {
    const result = new NRUAlgorithm({
      memoryInitalState: testCase3.memoryInitalState,
    }).run({ ...testCase3, shouldShowDetails: true });
    expect(result.name).toBe('nruAlgorithm');
    expect(result.cont).toBe(25);
    expect(result.simulationExecution?.length).toBeGreaterThan(0);
  });
});

describe(`Tests OptimalAlgorithm, test case 1`, () => {
  it(``, () => {
    const result = new OptimalAlgorithm({
      memoryInitalState: testCase1.memoryInitalState,
    }).run({ ...testCase1, shouldShowDetails: true });
    expect(result.name).toBe('optimalAlgorithm');
    expect(result.cont).toBe(19);
    expect(result.simulationExecution?.length).toBeGreaterThan(0);
  });
});

describe(`Tests OptimalAlgorithm, test case 2`, () => {
  it(``, () => {
    const result = new OptimalAlgorithm({
      memoryInitalState: testCase2.memoryInitalState,
    }).run({ ...testCase2, shouldShowDetails: true });
    expect(result.name).toBe('optimalAlgorithm');
    expect(result.cont).toBe(11);
    expect(result.simulationExecution?.length).toBeGreaterThan(0);
  });
});

describe(`Tests OptimalAlgorithm, test case 3`, () => {
  it(``, () => {
    const result = new OptimalAlgorithm({
      memoryInitalState: testCase3.memoryInitalState,
    }).run({ ...testCase3, shouldShowDetails: true });
    expect(result.name).toBe('optimalAlgorithm');
    expect(result.cont).toBe(12);
    expect(result.simulationExecution?.length).toBeGreaterThan(0);
  });
});

describe(`Tests SecondChanceAlgorithm, test case 1`, () => {
  it(``, () => {
    const result = new SecondChanceAlgorithm({
      memoryInitalState: testCase1.memoryInitalState,
    }).run({ ...testCase1, shouldShowDetails: true });
    expect(result.name).toBe('secondChanceAlgorithm');
    expect(result.cont).toBe(28);
    expect(result.simulationExecution?.length).toBeGreaterThan(0);
  });
});

describe(`Tests SecondChanceAlgorithm, test case 2`, () => {
  it(``, () => {
    const result = new SecondChanceAlgorithm({
      memoryInitalState: testCase2.memoryInitalState,
    }).run({ ...testCase2, shouldShowDetails: true });
    expect(result.name).toBe('secondChanceAlgorithm');
    expect(result.cont).toBe(16);
    expect(result.simulationExecution?.length).toBeGreaterThan(0);
  });
});

describe(`Tests SecondChanceAlgorithm, test case 3`, () => {
  it(``, () => {
    const result = new SecondChanceAlgorithm({
      memoryInitalState: testCase3.memoryInitalState,
    }).run({ ...testCase3, shouldShowDetails: true });
    expect(result.name).toBe('secondChanceAlgorithm');
    expect(result.cont).toBe(22);
    expect(result.simulationExecution?.length).toBeGreaterThan(0);
  });
});

describe(`Tests WSClockAlgorithm, test case 1`, () => {
  it(``, () => {
    const result = new WSClockAlgorithm({
      memoryInitalState: testCase1.memoryInitalState,
      tau: testCase1.tau,
    }).run({ ...testCase1, shouldShowDetails: true });
    expect(result.name).toBe('wsClockAlgorithm');
    expect(result.cont).toBe(27);
    expect(result.simulationExecution?.length).toBeGreaterThan(0);
  });
});

describe(`Tests WSClockAlgorithm, test case 2`, () => {
  it(``, () => {
    const result = new WSClockAlgorithm({
      memoryInitalState: testCase2.memoryInitalState,
      tau: testCase2.tau,
    }).run({ ...testCase2, shouldShowDetails: true });
    expect(result.name).toBe('wsClockAlgorithm');
    expect(result.cont).toBe(19);
    expect(result.simulationExecution?.length).toBeGreaterThan(0);
  });
});

describe(`Tests WSClockAlgorithm, test case 3`, () => {
  it(``, () => {
    const result = new WSClockAlgorithm({
      memoryInitalState: testCase3.memoryInitalState,
      tau: testCase3.tau,
    }).run({ ...testCase3, shouldShowDetails: true });

    expect(result.name).toBe('wsClockAlgorithm');
    expect(result.cont).toBe(24);
    expect(result.simulationExecution?.length).toBeGreaterThan(0);
  });
});