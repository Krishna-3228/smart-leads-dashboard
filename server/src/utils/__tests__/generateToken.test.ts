import { describe, expect, it, beforeEach, afterAll, jest } from "@jest/globals";
import jwt from "jsonwebtoken";
import generateToken from "../generateToken";

describe("generateToken", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv, JWT_SECRET: "test-secret" };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("should generate a valid JWT with the provided user ID and role", () => {
    const userId = "user123";
    const userRole = "admin";

    const token = generateToken(userId, userRole);
    expect(token).toBeDefined();
    expect(typeof token).toBe("string");

    const decoded = jwt.verify(token, "test-secret") as jwt.JwtPayload;
    expect(decoded.id).toBe(userId);
    expect(decoded.role).toBe(userRole);
  });
});
