import { Pool } from 'pg';
import { AlgorithmResult } from '../utils/types';

export default class DAO {
  protected client: Pool
  constructor() {
    const connectionString = process.env.DATABASE_URL
    this.client = new Pool({ connectionString, ssl: true });
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
        pagesQueueSize INT
      );
    `
    const createTableSimulationResultQuery = `
      CREATE TABLE IF NOT EXISTS SimulationResult (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        algorithmResult JSONB,
        simulationHistoryId UUID references SimulationHistory(id)
      );
    `
    await this.query(createTableSimulationHistoryQuery);
    await this.query(createTableSimulationResultQuery);
  }

  public async insertSimulationResult(args: { memorySize?: number, pagesQueueSize?: number, algorithmResult?: AlgorithmResult[] }) {
    const { algorithmResult, memorySize, pagesQueueSize } = args;
    if (!algorithmResult?.length) return;

    const insertSimulationHistoryQuery = `
      INSERT INTO SimulationHistory (
        simulationDate,
        memorySize,
        pagesQueueSize
      )
      VALUES ($1, $2, $3)
      RETURNING *
    `
    const insertSimulationHistoryValues = [
      new Date(),
      memorySize,
      pagesQueueSize,
    ]

    const res = await this.query(insertSimulationHistoryQuery, insertSimulationHistoryValues);
    const SimulationHistoryId = res?.rows[0]?.id;

    const insertSimulationResultQuery = `
      INSERT INTO SimulationResult (
        algorithmResult,
        simulationHistoryId
      )
      VALUES ($1, $2)
    `

    algorithmResult.map(async (cur: AlgorithmResult) => {
      const algorithmResult = { name: cur.name, faults: cur.cont, simulationTime: cur.simulationTime }
      const insertSimulationResultValues = [
        algorithmResult,
        SimulationHistoryId,
      ]
      await this.query(insertSimulationResultQuery, insertSimulationResultValues);
    })
  }
}