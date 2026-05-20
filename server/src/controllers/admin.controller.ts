import { Request, Response } from "express";

import asyncHandler from "express-async-handler";

import bcrypt from "bcryptjs";

import User from "../models/user.model";

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