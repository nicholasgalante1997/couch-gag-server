import { ServerResponse } from 'http';

export function cors(res: ServerResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');
  return;
}

export function getOptionsResponse(res: ServerResponse) {
  res.writeHead(200);
  res.end();
  return;
}
