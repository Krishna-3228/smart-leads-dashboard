import express from "express";

import protect from "../middlewares/auth.middleware";

import { authorizeRoles } from "../middlewares/role.middleware";

import validate from "../middlewares/validate.middleware";

import {
  createLeadSchema,
  updateLeadSchema,
} from "../validations/lead.validation";

import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
} from "../controllers/lead.controller";

const router = express.Router();

router.post("/", protect, validate(createLeadSchema), createLead);

router.get("/", protect, getLeads);

router.get("/:id", protect, getLeadById);

router.put("/:id", protect, validate(updateLeadSchema), updateLead);

router.delete("/:id", protect, authorizeRoles("admin"), deleteLead);

export default router;