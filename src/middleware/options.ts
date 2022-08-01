import { getOptionsResponse } from '../handlers';
import { Request, Response, NextFunction } from 'express';

export function fwdOptions(req: Request, res: Response, next: NextFunction) {
  if (req.method === 'OPTIONS') {
    getOptionsResponse(res);
    return;
  } else {
    next();
  }
}
