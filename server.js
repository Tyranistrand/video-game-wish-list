import "dotenv/config";
import express from "express";
import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import { usersRouter } from "./routes/usersRouter.js";
import { gamesRouter } from "./routes/gamesRouter.js";

const mongoURI = process.env.MONGODB_URI.replace(
  "USERNAME",
  process.env.MONGODB_USERNAME,
).replace("PASSWORD", process.env.MONGODB_PASSWORD);

await mongoose
  .connect(`${mongoURI}/wish-list`)
  .then(() => {
    console.log("Successfully connected to DB...");
  })
  .catch((err) => {
    console.log(`Error encountered when connecting to DB: ${err}`);
  });

const app = express();

app.use(express.json());
app.use("/users", usersRouter);
app.use("/video-games", gamesRouter);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "Fail",
    message: "Could not find desired resource",
  });
});

app.listen("8000", () => {
  console.log("Listening for requests on port 8000");
});
