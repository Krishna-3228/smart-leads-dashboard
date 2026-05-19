import express from "express";
import validate from "../middlewares/validate.middleware";
import { registerUser, loginUser } from "../controllers/auth.controller";
import { registerSchema, loginSchema } from "../validations/auth.validation";


const router = express.Router();

router.post("/register", validate(registerSchema), registerUser);

router.post("/login", validate(loginSchema), loginUser);

export default router;