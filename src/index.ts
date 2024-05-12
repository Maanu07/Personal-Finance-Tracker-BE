import express, { Express } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import financialRecordRouter from "./routes/financial-records";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

//  MIDDLEWARES
app.use(express.json());
app.use(cors());

const mongoURI = process.env.MONGODB_URI!;

// CONNECTING TO DB
mongoose
  .connect(mongoURI)
  .then(() => console.log("CONNECTED TO MONGODB!"))
  .catch((err) => console.error(`Failed to connect to MongoDB`, err));

// ROUTES STARTS
app.use("/financial-records", financialRecordRouter);

// STARTING THE SERVER
app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
