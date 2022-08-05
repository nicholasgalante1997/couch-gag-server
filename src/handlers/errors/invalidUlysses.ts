import { ServerResponse } from 'http';

const invalidUlyssesKeyErrMsg =
  'Missing ulysses key. Unverified source. Aborting.';
const invalidUlyssesKeyErrObj = { issue: invalidUlyssesKeyErrMsg };

export function handleInvalidUlyssesKey(res: ServerResponse) {
  res.writeHead(500, invalidUlyssesKeyErrMsg, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(JSON.stringify(invalidUlyssesKeyErrObj));
  return;
}
