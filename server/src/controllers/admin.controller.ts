import { Request, Response } from "express";

import asyncHandler from "express-async-handler";

import bcrypt from "bcryptjs";

import User from "../models/user.model";
import { AuthRequest } from "../types/auth.types";
import { getPresignedUrl } from "../utils/s3.utils";

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

      const imageUrl = user.imageUrl
        ? (await getPresignedUrl(user.imageUrl)) ?? undefined
        : undefined;

      res.status(201).json({
        message:
          "User created successfully",

        user: {
          id: user._id,

          name: user.name,

          email:
            user.email,

          role: user.role,

          imageUrl,
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

      // Resolve pre-signed URLs for all users who have a profile image key
      const usersWithSignedUrls = await Promise.all(
        users.map(async (u) => {
          const obj = u.toObject() as any;
          if (obj.imageUrl) {
            // Returns null on failure (e.g. legacy URL or bad key) → strip it
            obj.imageUrl = (await getPresignedUrl(obj.imageUrl)) ?? undefined;
          }
          return obj;
        })
      );

      res.status(200).json(usersWithSignedUrls);
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