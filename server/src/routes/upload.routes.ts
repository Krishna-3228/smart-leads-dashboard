import express from "express";
import protect from "../middlewares/auth.middleware";
import upload from "../middlewares/upload";
import { uploadImage } from "../controllers/upload.controller";

const router = express.Router();

router.post("/profile-image", protect, upload.single("image"), uploadImage);

export default router;
