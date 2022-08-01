import { ServerResponse } from 'http';

export function getOptionsResponse(res: ServerResponse) {
  res.writeHead(200);
  res.end();
  return;
}
