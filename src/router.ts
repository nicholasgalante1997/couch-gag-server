import { IncomingMessage, ServerResponse } from "http";
import url from 'url';
import fs from 'fs';
import { structValidResHeaders, storyDict } from "./util";
import { ResponseBody } from "./types";

export const router = {
    '/all': (req: IncomingMessage, res: ServerResponse) => {
        structValidResHeaders(res);
        const data = { collection: storyDict };
        res.end(JSON.stringify(data));
    },
    '/markdown': (req: IncomingMessage, res: ServerResponse) => {
        try {
            const parsed = url.parse(req.url!, true);
            const seasonKey = parsed.query.seasonKey;
            const episodeKey = parsed.query.episodeKey;
            const safeKey = `s${seasonKey}e${episodeKey}` as keyof typeof storyDict;
            const safePath = 'data/' + `s${seasonKey}-e${episodeKey}.md`;
            const file = fs.readFileSync(safePath, { encoding: 'utf-8' });
            const data: ResponseBody = {
                meta: storyDict[safeKey],
                content: file,
            }
            structValidResHeaders(res);
            res.end(JSON.stringify(data));
        } catch (e: any) {
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