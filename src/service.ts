import { IncomingMessage, ServerResponse } from 'http';
import url from 'url';
import fs from 'fs';
import { log } from '@nickgdev/couch-gag-common-lib';
import { ResponseBody } from './types';
import { generateStoryCollection, staticStoryList } from './util';

export function getAllStories() {
  try {
    return generateStoryCollection();
  } catch (e: any) {
    log('error', e.message || JSON.stringify(e));
  }
}

export function getStoryFileById(req: IncomingMessage) {
  try {
    const parsed = url.parse(req.url!, true);
    log(
      'info',
      'Retrieving file with key ' +
        parsed.query.seasonKey +
        parsed.query.episodeKey
    );
    const seasonKey = parsed.query.seasonKey;
    const episodeKey = parsed.query.episodeKey;
    const safeKey =
      `s${seasonKey}e${episodeKey}` as keyof typeof staticStoryList.collection;
    const safePath = 'data/' + `s${seasonKey}-e${episodeKey}.md`;
    const file = fs.readFileSync(safePath, { encoding: 'utf-8' });

    log('info', 'File Retrieved.');

    const data: ResponseBody = {
      meta: staticStoryList.collection[safeKey],
      content: file
    };
    return data;
  } catch (e: any) {
    throw new Error(e.message || JSON.stringify(e));
  }
}

export function catchAllRoute(res: ServerResponse) {
  res.writeHead(404);
  res.end(JSON.stringify({ issueCode: 0 }));
}
