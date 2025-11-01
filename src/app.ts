import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", routes);

app.use(errorHandler);

export default app;
