import { ServerResponse } from 'http';

const invalidUrlErrMsg =
  'url is undefined or null. cannot verify source of request. refusing response.';
const invalidUrlErrObj = { issue: invalidUrlErrMsg };

export function handleInvalidUrl(res: ServerResponse) {
  res.writeHead(500, invalidUrlErrMsg, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(JSON.stringify(invalidUrlErrObj));
  return;
}
