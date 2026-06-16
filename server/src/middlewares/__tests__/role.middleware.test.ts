import { describe, expect, it, beforeEach, jest } from "@jest/globals";
import { Response, NextFunction } from "express";
import { authorizeRoles } from "../role.middleware";
import type { AuthRequest } from "../../types/auth.types";

describe("authorizeRoles middleware", () => {
  let mockRequest: Partial<AuthRequest>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn<any>().mockReturnThis() as any,
      json: jest.fn<any>() as any,
    };
    nextFunction = jest.fn();
  });

  it("should return 401 if req.user is undefined", () => {
    const middleware = authorizeRoles("admin");
    middleware(mockRequest as AuthRequest, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Not authenticated",
    });
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it("should return 403 if req.user role is not authorized", () => {
    mockRequest.user = { id: "user123", role: "user" };
    const middleware = authorizeRoles("admin", "manager");
    middleware(mockRequest as AuthRequest, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Access denied",
    });
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it("should call next() if req.user role is authorized", () => {
    mockRequest.user = { id: "user123", role: "admin" };
    const middleware = authorizeRoles("admin", "manager");
    middleware(mockRequest as AuthRequest, mockResponse as Response, nextFunction);

    expect(nextFunction).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();
  });
});
