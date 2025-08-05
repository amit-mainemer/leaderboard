import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import {logger} from "@/services"
import apiRouter from "./api";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(logger.expressLogger);


// TODO: auth validations

app.use("/api", apiRouter)

if (process.env.NODE_ENV === "production") {
  const clientBuildPath = path.resolve(__dirname, "../../client/dist");
  app.use(express.static(clientBuildPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>
  logger.info(`🚀 Server running on http://localhost:${PORT}`)
);
