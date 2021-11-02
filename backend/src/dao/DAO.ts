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

  public async query(args: { query: string, values?: any[], caller: string }) {
    const { caller, query, values } = args;
    await this.client.connect();
    try {
      const res = await this.client.query(query, values);
      return res;
    } catch (error) {
      console.log("Error when querying db:", error, " Caller:", caller)
    }
  }

  public async initializeDB() {
    const createTableSimulationHistoryQuery = `
      CREATE TABLE IF NOT EXISTS "SimulationHistory" (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "simulationDate" TIMESTAMP,
        "simulationTime" INT,
        "memorySize" INT,
        "pagesQueueSize" INT,
        "optimalAlgorithm" INT,
        "fifoAlgorithm" INT,
        "secondChanceAlgorithm" INT,
        "lruAlgorithm" INT,
        "nruAlgorithm" INT,
        "wsClockAlgorithm" INT
      );
    `
    const createTableSimulationStatsQuery = `
      CREATE TABLE IF NOT EXISTS "SimulationStats" (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "totalOfSimulations" INT,
        "totalOfTime" INT
      )
    `;
    const insertTableSimulationStatsQuery = `
      INSERT INTO "SimulationStats" (
        "totalOfSimulations",
        "totalOfTime"
      )
      SELECT 0, 0
      WHERE NOT EXISTS (SELECT 1 FROM "SimulationStats")
    `
    await this.query({ query: createTableSimulationHistoryQuery, caller: "createTableSimulationHistoryQuery" });
    await this.query({ query: createTableSimulationStatsQuery, caller: "createTableSimulationStatsQuery" });
    await this.query({ query: insertTableSimulationStatsQuery, caller: "createTableSimulationStatsQuery" });
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

    const totalOfTime = algorithmResult.reduce((cur, prev) => cur + prev.simulationTime, 0) || 0;

    const insertSimulationHistoryQuery = `
      INSERT INTO "SimulationHistory" (
        "simulationDate",
        "simulationTime",
        "memorySize",
        "pagesQueueSize",
        "optimalAlgorithm",
        "fifoAlgorithm",
        "secondChanceAlgorithm",
        "lruAlgorithm",
        "nruAlgorithm",
        "wsClockAlgorithm"
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `
    const insertSimulationHistoryValues = [
      new Date(),
      totalOfTime,
      memorySize,
      pagesQueueSize,
      optimalAlgorithm,
      fifoAlgorithm,
      secondChanceAlgorithm,
      lruAlgorithm,
      nruAlgorithm,
      wsClockAlgorithm,
    ]

    const insertSimulationStatsQuery = `
      UPDATE "SimulationStats"
      SET "totalOfSimulations" = "totalOfSimulations" + 1,
      "totalOfTime" = "totalOfTime" + $1;
    `

    const insertSimulationStatsValues = [
      totalOfTime
    ]

    await this.query({ query: insertSimulationHistoryQuery, values: insertSimulationHistoryValues, caller: "insertSimulationHistoryQuery" });
    await this.query({ query: insertSimulationStatsQuery, values: insertSimulationStatsValues, caller: "insertSimulationStatsQuery" });
  }

  public async getLast30Simulations() {
    const last30SimulationsQuery = `
    SELECT "SimulationHistory"."simulationDate",
           "SimulationHistory"."simulationTime",
           "SimulationHistory"."memorySize",
           "SimulationHistory"."pagesQueueSize",
           "SimulationHistory"."optimalAlgorithm",
           "SimulationHistory"."fifoAlgorithm",
           "SimulationHistory"."secondChanceAlgorithm",
           "SimulationHistory"."lruAlgorithm",
           "SimulationHistory"."nruAlgorithm",
           "SimulationHistory"."wsClockAlgorithm"
    FROM "SimulationHistory"
    ORDER BY "SimulationHistory"."simulationDate" DESC
    LIMIT 30;
    `;
    const res = await this.query({ query: last30SimulationsQuery, caller: "last30SimulationsQuery" });
    return res?.rows
  }

  public async getSimulationStats() {
    const last30SimulationsQuery = `
    SELECT "SimulationStats"."totalOfSimulations",
           "SimulationStats"."totalOfTime"
    FROM "SimulationStats";
    `;
    const res = await this.query({ query: last30SimulationsQuery, caller: "last30SimulationsQuery" });
    return res?.rows[0];
  }
}