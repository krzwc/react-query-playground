import type {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';
import type { RequestError } from './types';
import type { ControllerResponse } from '../controllers/types';

export const catchAsyncDecorator = (
  fn: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<ControllerResponse>,
) => (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<ControllerResponse> =>
  fn(req, res, next).catch((err: ErrorRequestHandler) => next(err));

export const handle404 = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const err: RequestError = new Error('404 page not found');
  err.status = 404;
  next(err);
};

export const catchErrors = (
  err: RequestError,
  req: Request,
  res: Response,
): void => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
  });
};
