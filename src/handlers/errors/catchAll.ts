import { ServerResponse } from 'http';

export function catchAllRoute(res: ServerResponse) {
  res.writeHead(404);
  res.end(JSON.stringify({ issueCode: 0 }));
}
