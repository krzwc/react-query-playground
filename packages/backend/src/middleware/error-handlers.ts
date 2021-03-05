import { Request, Response, NextFunction } from 'express';
import { Error } from './types';

export const catchAsyncDecorator = (
  fn: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<any>,
) => (req: Request, res: Response, next: NextFunction) =>
  fn(req, res, next).catch((err: Error) => next(err));

export const handle404 = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const err: Error = new Error('404 page not found');
  err.status = 404;
  next(err);
};

export const catchErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
  });
};
