import { Request, Response } from "express";

import asyncHandler from "express-async-handler";

import bcrypt from "bcryptjs";

import User from "../models/user.model";
import { AuthRequest } from "../types/auth.types";

export const createUserByAdmin =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {

      const {
        name,
        email,
        password,
        role,
      } = req.body;

      const normalizedEmail =
        email.toLowerCase();

      const existingUser =
        await User.findOne({
          email:
            normalizedEmail,
        });

      if (existingUser) {
        res.status(400);

        throw new Error(
          "User already exists"
        );
      }

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      const user =
        await User.create({
          name,
          email:
            normalizedEmail,
          password:
            hashedPassword,
          role,
        });

      res.status(201).json({
        message:
          "User created successfully",

        user: {
          id: user._id,

          name: user.name,

          email:
            user.email,

          role: user.role,
        },
      });
    }
  );

export const getAllUsers =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const users = await User.find({});
      res.status(200).json(users);
    }
  );

export const deleteUser =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const userId = req.params.id;
      const authReq = req as AuthRequest;

      if (authReq.user?.id === userId) {
        res.status(400);
        throw new Error("You cannot delete your own account");
      }

      const user = await User.findById(userId);
      if (!user) {
        res.status(404);
        throw new Error("User not found");
      }

      await User.deleteOne({ _id: userId });

      res.status(200).json({
        message: "User deleted successfully",
      });
    }
  );