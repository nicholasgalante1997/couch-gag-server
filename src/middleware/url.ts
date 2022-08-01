import { Request, Response, NextFunction } from 'express';

import { handleInvalidUrl } from '../handlers';

export function checkValidUrl(req: Request, res: Response, next: NextFunction) {
  const { url: reqUrl } = req;
  if (!reqUrl) {
    handleInvalidUrl(res);
    return;
  } else {
    next();
  }
}
