import fs from 'fs';
import path from 'path';
import graymatter from 'gray-matter';
import { StoryMeta } from '@nickgdev/couch-gag-common-lib';

export function parseFrontMatterIntoStoryType(str: string) {
  return graymatter(str).data as StoryMeta;
}

export function generateStoryCollection() {
  let collection: {
    [season: string]: {
      [episode: string]: StoryMeta; 
    } 
  } | undefined;
  let error: string | undefined;
  try {
    const mdbContents = fs.readdirSync(path.resolve(process.cwd(), 'mdb'), { encoding: 'utf-8' });
    let markdownFiles: string[] = [];
    for (const directory of mdbContents) {
      const absPath = path.resolve(process.cwd(), 'mdb', directory);
      const files = fs.readdirSync(absPath, { encoding: 'utf-8' });
      files.reduce((agg: string[], next: string) => {
        agg.push(`${directory}/${next}`);
        return agg;
      }, markdownFiles);
    }
    collection = {};
    for (const filename of markdownFiles) {
      const fileData = fs.readFileSync(
        path.resolve(process.cwd(), 'mdb', filename),
        { encoding: 'utf-8' }
      );
      const meta = parseFrontMatterIntoStoryType(fileData);
      const collectionKeyIdentifier = `season_${meta.seasonKey}`;
      Object.assign(collection, { 
        [collectionKeyIdentifier]: {
          ...collection[collectionKeyIdentifier],
          [`episode_${meta.episodeKey}`]: meta
        } 
      });
    }
  } catch (e: any) {
    error = e.message || JSON.stringify(e);
    collection = undefined;
  } finally {
    if (collection) return { collection };
    else throw new Error(error);
  }
}

export const staticStoryList = generateStoryCollection();
