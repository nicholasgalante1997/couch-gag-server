import http from 'http';
import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import { log } from '@nickgdev/couch-gag-common-lib';
import { router } from './router';
import { getOptionsResponse, cors } from './cors';
import { handleInvalidUlyssesKey, handleInvalidUrl } from './error';

dotenv.config();

const PORT = process.env.PORT || (2023 as const);

const app = express();

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

/** locally defined cors */
app.use((_req: Request, res: Response, next: NextFunction) => {
  cors(res);
  next();
})

/** handle options prefetch */

app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    getOptionsResponse(res);
    return;
  } else {
    next();
  }
})

/** handle invalid url on request */
app.use((req: Request, res: Response, next: NextFunction) => {
  const { url: reqUrl, headers } = req;
  if (!reqUrl) {
    handleInvalidUrl(res);
    return;
  } else {
    next();
  }
})

/** verify ulysses key */
app.use(verifyUlyssesKey);

app.get('/all', router['/all']);

app.get('/markdown', router['/markdown']);

app.use('*', router.default);

const server = http.createServer(app);

server.listen(PORT, () => {
  log('info', 'Server started on ' + PORT);
});
