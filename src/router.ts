import { IncomingMessage, ServerResponse } from "http";
import url from 'url';
import fs from 'fs';
import { structValidResHeaders } from "./util";
import { log } from './log';
import { ResponseBody } from "./types";
import storyDict from "./map";

export const router = {
    '/all': (req: IncomingMessage, res: ServerResponse) => {
        log('info', 'Beginning \'all\' route operations.')
        structValidResHeaders(res);
        const data = { collection: storyDict };
        res.end(JSON.stringify(data));
        log('info', '\'all\' route operations complete.');
        return;
    },
    '/markdown': (req: IncomingMessage, res: ServerResponse) => {
        log('info', 'Beginning \'markdown\' route operations.')
        try {
            const parsed = url.parse(req.url!, true);
            log('info', 'Retrieving file with key ' + parsed.query.seasonKey + parsed.query.episodeKey);
            const seasonKey = parsed.query.seasonKey;
            const episodeKey = parsed.query.episodeKey;
            const safeKey = `s${seasonKey}e${episodeKey}` as keyof typeof storyDict;
            const safePath = 'data/' + `s${seasonKey}-e${episodeKey}.md`;
            const file = fs.readFileSync(safePath, { encoding: 'utf-8' });
            log('info', 'File Retrieved.')
            const data: ResponseBody = {
                meta: storyDict[safeKey],
                content: file,
            }
            structValidResHeaders(res);
            res.end(JSON.stringify(data));
            log('info', 'Completed \'markdown\' route operations.')
            return;
        } catch (e: any) {
            log('error', e.message || JSON.stringify(e));
            res.writeHead(
                500, 
                'Server Issue: issue source::' + JSON.stringify(e)
            )
        }
    },
    default: (req: IncomingMessage, res: ServerResponse) => {
        res.writeHead(404);
        res.end(JSON.stringify({ issueCode: 0 }));
    },
};