import express from "express";
import { getUser, getUsers } from "../controllers/userController.js";
import { signup } from "../controllers/authController.js";

export const usersRouter = express.Router();

usersRouter.route("/").get(getUsers);
usersRouter.route("/:id").get(getUser);
usersRouter.route("/signup").post(signup);

export default usersRouter;
