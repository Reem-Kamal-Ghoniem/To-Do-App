import express from 'express';
import * as controller from '../controllers/taskController.js';
import { authenticateToken } from '../middlewares/userAuthentication.js';

const taskRouter = express.Router();

taskRouter.get("/:id", authenticateToken, controller.getTasks);
taskRouter.post("/:user_id", authenticateToken, controller.createTask);
taskRouter.delete("/:id", authenticateToken, controller.deleteTask);
taskRouter.put("/:id", authenticateToken, controller.updateTask);

export default taskRouter;
