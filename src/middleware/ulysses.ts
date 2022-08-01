import { Request, Response, NextFunction } from 'express';
import { handleInvalidUlyssesKey } from '../handlers';

export function verifyUlyssesKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { headers } = req;
  const verified: boolean =
    headers['x-ulysses-key'] === process.env.ULYSSES_HASHED_KEY;
  if (verified) {
    next();
  } else {
    handleInvalidUlyssesKey(res);
    return;
  }
}
