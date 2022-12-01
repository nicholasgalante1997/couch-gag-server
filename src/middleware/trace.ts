import { log } from '@nickgdev/couch-gag-common-lib';
import { Request, Response, NextFunction } from 'express';

export function couchGagTrace(req: Request, res: Response, next: NextFunction){
    const {
        statusCode,
        hostname,
        headers,
        ip,
        baseUrl,
        path,
        params
    } = req;

    const now = Date.now();
    const dateline = `[info] couch-gag-server-${process.env.SERVER_INDEX}: new request at ${now}`;
    log('info', dateline);

    const reqline = `
        [${statusCode}] - ${baseUrl + path}\r\n
        {
            Params: ${JSON.stringify(params)},
            Headers: ${JSON.stringify(headers)},
            Identity: ${hostname + '-' + ip}
        }
    `;
    log('info', reqline);
    next();
}
