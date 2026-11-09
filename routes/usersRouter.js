import express from "express";
import { createUser, getUsers } from "../controllers/userController.js";

export const usersRouter = express.Router();

usersRouter.route("/").get(getUsers);
usersRouter.route("/createUser").post(createUser);

export default usersRouter;
