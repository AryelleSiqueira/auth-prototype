import "reflect-metadata";

import "./container";

import express from 'express';
import { initializeDB } from "./data-source";
import { exampleRoutes } from './routes/example.routes';

(async () => { 
  await initializeDB(15, 10000);
})();

const app = express();
const port = process.env.LISTEN_PORT ? parseInt(process.env.LISTEN_PORT) : 3333;

app.use(express.json());
app.use(exampleRoutes);

console.log("Starting server...");

app.listen(port, () => {
  console.log(`Servidor running on port ${port}`);
});
