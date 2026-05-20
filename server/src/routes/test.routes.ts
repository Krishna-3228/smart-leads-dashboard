import express from "express";
import protect from "../middlewares/auth.middleware";
import type { AuthRequest } from "../types/auth.types";

const router = express.Router();

router.get(
  "/protected",
  protect,
  (req: AuthRequest, res) => {
    res.json({
      message: "Protected route accessed",
      user: req.user,
    });
  }
);


export default router;