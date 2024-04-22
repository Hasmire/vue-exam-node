import { PrismaClient } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import { validateTask } from "./validator/task";
import { handleValidationErrors } from "./middleware/validationHandling";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express!");
});

app.get("/tasks", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

app.post(`/task`, validateTask, handleValidationErrors, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, status } = req.body;
    const result = await prisma.task.create({
      data: {
        title,
        status,
      },
    });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

app.put("/task/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const task = await prisma.task.findUnique({ where: { id: Number(id) } });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: {
        status: task.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
      },
    });

    res.json(updatedTask);
  } catch (err) {
    next(err);
  }
});

app.delete("/task/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const task = await prisma.task.delete({ where: { id: Number(id) } });
    res.json(task);
  } catch (err) {
    next(err);
  }
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
