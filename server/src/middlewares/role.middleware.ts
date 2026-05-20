import { Response, NextFunction } from "express";
import type { AuthRequest } from "../types/auth.types";

export const authorizeRoles = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "Not authenticated",
      });
    }

    if (!roles.includes(user.role)) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    next();
  };
};