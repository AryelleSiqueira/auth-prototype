import "reflect-metadata";

import "./container"

import express from 'express';
import { AppDataSource } from "./data-source";
import { exampleRoutes } from './routes/example.routes';


AppDataSource.initialize().then(() => {
    console.log("Connected to database successfully");
  })
  .catch((err) => {
    console.error("Database connection failed:\n", err);
    process.exit(1);
  });

const app = express();
const port = process.env.LISTEN_PORT ? parseInt(process.env.LISTEN_PORT) : 3333;

app.use(express.json());
app.use(exampleRoutes);

console.log("Starting server...");

app.listen(port, () => {
  console.log(`Servidor running on port ${port}`);
});
