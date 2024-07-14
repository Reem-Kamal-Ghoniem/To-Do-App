import express from "express";
import taskRouter from "./Routes/taskRouter.js";
import userRouter from "./Routes/userRouter.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/user', userRouter);
app.use('/tasks', taskRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
