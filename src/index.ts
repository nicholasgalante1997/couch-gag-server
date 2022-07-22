import http, { IncomingMessage, ServerResponse } from 'http';
import dotenv from 'dotenv';
import url from 'url';
import { log } from '@nickgdev/couch-gag-common-lib';
import { router } from './router';
import { getOptionsResponse, cors } from './cors';
import { handleInvalidUlyssesKey, handleInvalidUrl } from './error';

dotenv.config();

const PORT = process.env.PORT || (2023 as const);

const server = http.createServer(function (
  req: IncomingMessage,
  res: ServerResponse
) {
  const { url: reqUrl, headers } = req;
  const verified: boolean =
    headers['x-ulysses-key'] === process.env.ULYSSES_HASHED_KEY;

  cors(res);

  if (req.method === 'OPTIONS') {
    getOptionsResponse(res);
    return;
  }

  if (!reqUrl) {
    handleInvalidUrl(res);
    return;
  }

  if (!verified) {
    handleInvalidUlyssesKey(res);
    return;
  }

  if (verified && reqUrl) {
    const parsed = url.parse(reqUrl!, true);
    let { pathname } = parsed;
    if (pathname !== '/all' && pathname !== '/markdown') {
      pathname = 'default';
    }
    const handle = router[pathname as keyof typeof router];
    handle(req, res);
    return;
  }
});

server.listen(PORT, () => {
  log('info', 'Server started on ' + PORT);
});
