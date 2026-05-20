import { Request, Response } from "express";

import asyncHandler from "express-async-handler";

import bcrypt from "bcryptjs";

import User from "../models/user.model";

import generateToken from "../utils/generateToken";

export const registerUser =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {

      const {
        name,
        email,
        password,
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

          role: "sales",
        });

      res.status(201).json({
        message:
          "User registered",

        token:
          generateToken(
            user._id.toString(),
            user.role
          ),

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

export const loginUser =
  asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {

      const {
        email,
        password,
      } = req.body;

      const normalizedEmail =
        email.toLowerCase();

      const user =
        await User.findOne({
          email:
            normalizedEmail,
        });

      if (!user) {
        res.status(401);

        throw new Error(
          "Invalid credentials"
        );
      }

      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {
        res.status(401);

        throw new Error(
          "Invalid credentials"
        );
      }

      res.status(200).json({
        message:
          "Login successful",

        token:
          generateToken(
            user._id.toString(),
            user.role
          ),

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