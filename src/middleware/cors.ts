import { ServerResponse } from 'http';
import { Request, Response, NextFunction } from 'express';

export function cors(res: ServerResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
  return;
}

export function bareMinCors(_req: Request, res: Response, next: NextFunction) {
  cors(res);
  next();
}
