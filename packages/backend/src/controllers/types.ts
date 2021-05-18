import { Response } from 'express';

export type ControllerResponse = void | Response<
  any,
  Record<string, any>
>;
