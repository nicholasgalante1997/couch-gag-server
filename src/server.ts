import http from 'http';
import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import { router } from './router';
import { getOptionsResponse, cors } from './cors';
import { handleInvalidUlyssesKey, handleInvalidUrl } from './error';

dotenv.config();

export const PORT = process.env.PORT || (2023 as const);

const app = express();

/** middleware decls */
function verifyUlyssesKey(req: Request, res: Response, next: NextFunction){
  const { headers } = req;
  const verified: boolean = headers['x-ulysses-key'] === process.env.ULYSSES_HASHED_KEY;
  if (verified) {
    next();
  } else {
    handleInvalidUlyssesKey(res);
    return;
  }
}

function bareMinCors(_req: Request, res: Response, next: NextFunction) {
  cors(res);
  next();
}

function fwdOptions(req: Request, res: Response, next: NextFunction) {
  if (req.method === 'OPTIONS') {
    getOptionsResponse(res);
    return;
  } else {
    next();
  }
}

function checkValidUrl(req: Request, res: Response, next: NextFunction) {
  const { url: reqUrl } = req;
  if (!reqUrl) {
    handleInvalidUrl(res);
    return;
  } else {
    next();
  }
}

/** middleware impls */

/** locally defined cors */
app.use(bareMinCors)

/** handle options prefetch */
app.use(fwdOptions)

/** handle invalid url on request */
app.use(checkValidUrl)

/** verify ulysses key */
app.use(verifyUlyssesKey);

/** end middleware, begin routes */

app.get('/all', router['/all']);

app.get('/markdown', router['/markdown']);

app.use('*', router.default);

export const server = http.createServer(app);
