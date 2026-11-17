import express from "express";
import { createAccount, getUsers } from "../controllers/userController.js";

export const usersRouter = express.Router();

usersRouter.route("/").get(getUsers);
usersRouter.route("/createAccount").post(createAccount);

export default usersRouter;
