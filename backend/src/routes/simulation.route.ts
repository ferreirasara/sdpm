import { Router, Request, Response } from 'express';
import { SimulationData, SimuationResponse } from '../utils/types';

const router: Router = Router();

router.post('/', (req: Request, res: Response) => {
  const { algorithms, clockInterruption, memoryInitalState, memorySize, numberOfPages, pages, pagesQueue, pagesQueueSize, tau }: SimulationData = req.body;

  const response: SimuationResponse = {
    success: true,
    faultsPerAlgorithm: [
      { name: "optimalAlgorithm", cont: 10 },
      { name: "fifoAlgorithm", cont: 20 },
      { name: "secondChanceAlgorithm", cont: 15 },
      { name: "lruAlgorithm", cont: 18 },
      { name: "nruAlgorithm", cont: 13 },
      { name: "wsClockAlgorithm", cont: 10 },
    ],
    simulationTime: 5000,
  }

  setTimeout(() => res.send(response), 1500)
});

// Export the express.Router() instance
export const Simulation: Router = router;