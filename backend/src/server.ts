import { Router, Request, Response } from 'express';
import { SimulationData } from './types';

const router: Router = Router();

router.post('/', (req: Request, res: Response) => {
  const { algorithms, clockInterruption, memoryInitalState, memorySize, numberOfPages, pages, pagesQueue, pagesQueueSize, tau }: SimulationData = req.body;
  console.log(algorithms, clockInterruption, memoryInitalState, memorySize, numberOfPages, pages, pagesQueue, pagesQueueSize, tau)

  res.send(`Simulating...`);
});

// Export the express.Router() instance
export const SimulationController: Router = router;