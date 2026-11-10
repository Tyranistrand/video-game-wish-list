import express from "express";
import {
  getVideoGamesByName,
  addVideoGameToWishlist,
} from "../controllers/gameController.js";

export const gamesRouter = express.Router();

gamesRouter.route("/:name").get(getVideoGamesByName);
gamesRouter.route("/wish-list").post(addVideoGameToWishlist);
export default gamesRouter;
