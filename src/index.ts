import http, { IncomingMessage, ServerResponse, } from 'http';
import dotenv from 'dotenv';
import url from 'url';
import { router } from './router';

dotenv.config();

const PORT = 2023 as const;

const server = http.createServer(
  function (req: IncomingMessage, res: ServerResponse) {

    const { url: reqUrl, headers } = req;

    /** Cors Headers */
    res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	res.setHeader('Access-Control-Allow-Headers', '*');

	if (req.method === 'OPTIONS') {
		res.writeHead(200);
		res.end();
		return;
	}

    if (!reqUrl) {
        const errMsg = 'url is undefined or null. cannot verify source of request. refusing response.';
        const errRes = { issue: errMsg };
        console.error(errMsg);
        res.writeHead(500, errMsg, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify(errRes));
        return;
    }

    const verified: boolean = (headers['x-ulysses-key'] === process.env.ULYSSES_HASHED_KEY)

    if (!verified) {
        const errMsg = 'Missing ulysses key. Unverified source. Aborting.';
        const errRes = { issue: errMsg };
        console.error(errMsg);
        res.writeHead(500, errMsg, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify(errRes));
        return;
    }

    if (verified && reqUrl) {
        const parsed = url.parse(reqUrl!, true);
        let { pathname } = parsed;
        if (pathname !== '/all' && pathname !== '/markdown' ) {
            pathname = 'default'
        }
        const handle = router[pathname as keyof typeof router];
        handle(req, res);
    }
  }
);

server.listen(PORT);