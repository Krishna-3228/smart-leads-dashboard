import { z } from "zod";

export const createLeadSchema = z.object({
  name: z
    .string()
    .min(2, "Name is too short"),

  email: z.email(),

  source: z.enum([
    "website",
    "instagram",
    "referral",
  ]),
});

export const updateLeadSchema = z.object({
  name: z.string().min(2).optional(),

  email: z.email().optional(),

  status: z
    .enum([
      "new",
      "contacted",
      "qualified",
      "lost",
    ])
    .optional(),

  source: z
    .enum([
      "website",
      "instagram",
      "referral",
    ])
    .optional(),
});