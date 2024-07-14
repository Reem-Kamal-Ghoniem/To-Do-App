import express from "express";
import * as controller from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/login", controller.loginController);
userRouter.post("/register", controller.registerController);

export default userRouter;
