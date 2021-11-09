import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { validateSimulationParamsIntegrityMiddleware, validateSimulationRequiredParamsMiddleware } from "./middlewares/simulation.middleware";
import { simulationService } from "./services/simulation.service";
import DAO from "./dao/DAO";
import { simulationHistoryService, simulationStatsService } from "./services/simulationHistory.service";
import { simulationRatingStatsService, simulatorRatingService } from "./services/simulatorRating.service";
import { validateSimulationRatingRequiredParamsMiddleware } from "./middlewares/rating.middleware";
require("dotenv").config({ path: __dirname + "/.env" });

// Initialize DB
const dao = new DAO();
dao.initializeDB().then().catch(error => console.log(error));

// Create a new express application instance
const app: express.Application = express();

app.use(cors());
// support application/json type post data
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
//support application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/simulation", [
  validateSimulationRequiredParamsMiddleware,
  validateSimulationParamsIntegrityMiddleware,
  simulationService,
])

app.get("/simulationHistory", [
  simulationHistoryService,
])

app.get("/simulationStats", [
  simulationStatsService,
])

app.post("/simulatorRating", [
  validateSimulationRatingRequiredParamsMiddleware,
  simulatorRatingService,
])

app.get("/simulationRatingStats", [
  simulationRatingStatsService,
])

// The port the express app will listen on
const port = process.env.PORT || 8080;


// Serve the application at the given port
app.listen(port, () => {
  console.log(`Listening at ${process.env.NODE_ENV !== "production" ? "http://localhost:" : "https://api-sdpm-simulator.herokuapp.com:"}${port}/`);
});