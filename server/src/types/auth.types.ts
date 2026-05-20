import type { Request } from "express";

export interface JwtPayload {
  id: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}
