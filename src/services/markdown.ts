import fs from 'fs';
import { log } from '@nickgdev/couch-gag-common-lib';
import { ResponseBody } from '../types';
import { generateStoryCollection, staticStoryList } from '../utils';

export function getAllStories() {
  try {
    return generateStoryCollection();
  } catch (e: any) {
    log('error', e.message || JSON.stringify(e));
    return staticStoryList;
  }
}

export function getStoryFileById(seasonKey: string, episodeKey: string) {
  try {
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
