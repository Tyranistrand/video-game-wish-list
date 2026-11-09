import express from "express";
import { getVideoGamesByName } from "../controllers/gameController.js";

export const gamesRouter = express.Router();

gamesRouter.route("/:name").post(getVideoGamesByName);

export default gamesRouter;
