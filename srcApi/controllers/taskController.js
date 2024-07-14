import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getTasks = async (req, res) => {
    try {
        const tasks = await prisma.task.findMany({
            where: { userId: req.user.userId },
        });

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'An error encountered' });
    }
};

export const createTask = async (req, res) => {
    const { title } = req.body;

    try {
        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }

        const task = await prisma.task.create({
            data: {
                title,
                userId: req.user.userId,
            },
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: 'An error encountered' });
    }
};

export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    try {
        const updatedTask = await prisma.task.update({
            where: { id: parseInt(id) },
            data: {
                title,
                completed,
            },
        });

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: 'An error encountered' });
    }
};

export const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.task.delete({
            where: { id: parseInt(id) },
        });

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'An error encountered' });
    }
};
