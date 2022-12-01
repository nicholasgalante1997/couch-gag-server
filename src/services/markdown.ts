import fs from 'fs';
import { log } from '@nickgdev/couch-gag-common-lib';
import { ResponseBody } from '../types';
import { generateStoryCollection, staticStoryList } from '../utils';
import path from 'path';

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
    const safePath = path.resolve(process.cwd(), 'mdb', seasonKey, `${episodeKey}.md`);
    const file = fs.readFileSync(safePath, { encoding: 'utf-8' });

    log('info', 'File Retrieved.');

    const data: ResponseBody = {
      meta: staticStoryList.collection[`season_${seasonKey}`][`episode_${episodeKey}`],
      content: file
    };
    return data;
  } catch (e: any) {
    throw new Error(e.message || JSON.stringify(e));
  }
}
