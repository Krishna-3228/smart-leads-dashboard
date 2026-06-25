import { Response } from "express";
import asyncHandler from "express-async-handler";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "../config/s3";
import User from "../models/user.model";
import { AuthRequest } from "../types/auth.types";
import { getPresignedUrl } from "../utils/s3.utils";

export const uploadImage = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const file = req.file;
    if (!file) {
      res.status(400);
      throw new Error("No file uploaded");
    }

    // Use a unique key to store the object in S3
    const key = `profile-images/${Date.now()}-${file.originalname}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    // Store the S3 key (not the full URL) in the database
    if (req.user?.id) {
      await User.findByIdAndUpdate(req.user.id, { imageUrl: key });
    }

    // Generate a pre-signed URL so the frontend can immediately display the image
    const signedUrl = await getPresignedUrl(key);

    res.status(200).json({
      imageUrl: signedUrl,
    });
  }
);