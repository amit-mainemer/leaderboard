import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {logger} from "./services"
import apiRouter from "./api";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware";
import { registerJobs } from "./register.jobs";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(logger.expressLogger);

// TODO: rate limiting
// TODO: auth validations


app.use("/api", apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

registerJobs();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>
  logger.info(`🚀 Server running on http://localhost:${PORT}`)
);
