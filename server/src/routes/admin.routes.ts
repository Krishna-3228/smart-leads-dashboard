import express from "express";
import protect from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";
import { createUserByAdmin, getAllUsers, deleteUser } from "../controllers/admin.controller";

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

router.get(
  "/users",
  protect,
  authorizeRoles("admin"),
  getAllUsers
);

router.post(
  "/users",
  protect,
  authorizeRoles("admin"),
  createUserByAdmin
);

router.delete(
  "/users/:id",
  protect,
  authorizeRoles("admin"),
  deleteUser
);

export default router;