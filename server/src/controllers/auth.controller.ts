import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model";
import generateToken from "../utils/generateToken";

export const registerUser = async (
    req: Request,
    res: Response
) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "sales",
        });

        res.status(201).json({
            message: "User registered",
            token: generateToken(
                user._id.toString(),
                user.role
            ),
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
        });
    }
};

export const loginUser = async (
    req: Request,
    res: Response
) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        res.status(200).json({
            message: "Login successful",
            token: generateToken(
                user._id.toString(),
                user.role
            ),
            user: {
                id: user._id,

                name: user.name,

                email: user.email,

                role: user.role,
            },
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server error",
        });
    }
};