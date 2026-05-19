import express from "express";
import protect, {
  AuthRequest,
} from "../middlewares/auth.middleware";

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