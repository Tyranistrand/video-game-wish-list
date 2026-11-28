import express from "express";
import { getWishList } from "../controllers/wishlistController";
export const wishlistRouter = express.Router();

wishlistRouter.route("/").get(getWishList);
export default wishlistRouter;
