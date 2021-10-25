import { Pool } from 'pg';
import { AlgorithmResult } from '../utils/types';

export default class DAO {
  protected client: Pool
  constructor() {
    const connectionString = process.env.DATABASE_URL
    if (connectionString) {
      this.client = new Pool({ connectionString, ssl: true });
    } else {
      this.client = new Pool();
    }

  }

  public async query(query: string, values?: any[]) {
    await this.client.connect();
    try {
      const res = await this.client.query(query, values);
      return res;
    } catch (error) {
      console.log("Error when querying db:", error)
    }
  }

  public async initializeDB() {
    const createTableSimulationHistoryQuery = `
      CREATE TABLE IF NOT EXISTS SimulationHistory (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        simulationDate TIMESTAMP,
        memorySize INT,
        pagesQueueSize INT,
        optimalAlgorithm INT,
        fifoAlgorithm INT,
        secondChanceAlgorithm INT,
        lruAlgorithm INT,
        nruAlgorithm INT,
        wsClockAlgorithm INT
      );
    `
    await this.query(createTableSimulationHistoryQuery);
  }

  public async insertSimulationResult(args: { memorySize?: number, pagesQueueSize?: number, algorithmResult?: AlgorithmResult[] }) {
    const { algorithmResult, memorySize, pagesQueueSize } = args;
    if (!algorithmResult?.length) return;

    const optimalAlgorithm = algorithmResult.find(cur => cur.name === 'optimalAlgorithm')?.cont;
    const fifoAlgorithm = algorithmResult.find(cur => cur.name === 'fifoAlgorithm')?.cont;
    const secondChanceAlgorithm = algorithmResult.find(cur => cur.name === 'secondChanceAlgorithm')?.cont;
    const lruAlgorithm = algorithmResult.find(cur => cur.name === 'lruAlgorithm')?.cont;
    const nruAlgorithm = algorithmResult.find(cur => cur.name === 'nruAlgorithm')?.cont;
    const wsClockAlgorithm = algorithmResult.find(cur => cur.name === 'wsClockAlgorithm')?.cont;

    const insertSimulationHistoryQuery = `
      INSERT INTO SimulationHistory (
        simulationDate,
        memorySize,
        pagesQueueSize,
        optimalAlgorithm,
        fifoAlgorithm,
        secondChanceAlgorithm,
        lruAlgorithm,
        nruAlgorithm,
        wsClockAlgorithm
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `
    const insertSimulationHistoryValues = [
      new Date(),
      memorySize,
      pagesQueueSize,
      optimalAlgorithm,
      fifoAlgorithm,
      secondChanceAlgorithm,
      lruAlgorithm,
      nruAlgorithm,
      wsClockAlgorithm,
    ]

    await this.query(insertSimulationHistoryQuery, insertSimulationHistoryValues);
  }
}