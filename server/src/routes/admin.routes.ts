import express from "express";
import protect from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";
import { createUserByAdmin } from "../controllers/admin.controller";

const router = express.Router();

router.get(
  "/",
  protect,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({
      message: "Welcome admin",
    });
  }
);

router.post(
  "/users",
  protect,
  authorizeRoles("admin"),
  createUserByAdmin
);

export default router;