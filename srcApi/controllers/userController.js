import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const registerController = async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
        return res.status(409).json({ error: 'Email already exists' });
    }

    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        const token = jwt.sign(
            { userId: newUser.id },
            process.env.JWT_SECRET
        );

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        res.status(500).json({ error: 'An error encountered' });
    }
};

export const loginController = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: 'User not found! Please register' });
        }

        const passwordCheck = await bcrypt.compare(password, user.password);

        if (!passwordCheck) {
            return res.status(401).json({ error: 'Invalid Password' });
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET
        );

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'An error encountered' });
    }
};
