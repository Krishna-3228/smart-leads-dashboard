import { describe, expect, it, beforeEach, jest } from "@jest/globals";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import validate from "../validate.middleware";

describe("validate middleware", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  const testSchema = z.object({
    name: z.string(),
    email: z.string().email(),
  });

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn<any>().mockReturnThis() as any,
      json: jest.fn<any>() as any,
    };
    nextFunction = jest.fn();
  });

  it("should call next() if schema validation succeeds", () => {
    mockRequest.body = {
      name: "John Doe",
      email: "john@example.com",
    };

    const middleware = validate(testSchema);
    middleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(nextFunction).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();
  });

  it("should return 400 and validation errors if validation fails", () => {
    mockRequest.body = {
      name: "John Doe",
      email: "invalid-email",
    };

    const middleware = validate(testSchema);
    middleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Validation failed",
        errors: expect.any(Array),
      })
    );
    expect(nextFunction).not.toHaveBeenCalled();
  });
});
