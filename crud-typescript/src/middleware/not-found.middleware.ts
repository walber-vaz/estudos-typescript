import { NextFunction, Request, Response } from 'express';

export const notFoundHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const message = `Resource not found - ${request.originalUrl}`;
  response.status(404).send(message);
}