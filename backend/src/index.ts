import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import { validateParamsIntegrityMiddleware, validateRequiredParamsMiddleware } from './middlewares/simulation.middleware';
require('dotenv').config({ path: __dirname+'/.env' });

// Create a new express application instance
const app: express.Application = express();

app.use(cors());
// support application/json type post data
app.use(bodyParser.json());
//support application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/simulation', [
    validateRequiredParamsMiddleware,
    validateParamsIntegrityMiddleware,
])

// The port the express app will listen on
const port = process.env.PORT;

// Serve the application at the given port
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});