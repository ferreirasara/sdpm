import express from 'express';
import bodyParser from "body-parser";
import { SimulationController } from './server';

// Create a new express application instance
const app: express.Application = express();

// support application/json type post data
app.use(bodyParser.json());
//support application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: false }));
// Mount the SimulationController at the /simulate route
app.use('/simulate', SimulationController);

// The port the express app will listen on
const port = process.env.PORT || 8080;

// Serve the application at the given port
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});