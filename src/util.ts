import fs from 'fs';
import path from 'path';
import { ServerResponse } from 'http';
import graymatter from 'gray-matter';
import { MarkdownMeta } from './types';

export function structValidResHeaders(res: ServerResponse) {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
}

export function parseFrontMatterIntoStoryType(str: string) {
  return graymatter(str).data as MarkdownMeta;
}

export function generateStoryCollection() {
  let collection: { [x: string]: MarkdownMeta } | undefined;
  let error: string | undefined;
  try {
    const markdownFiles: string[] = fs.readdirSync(
      path.resolve(process.cwd(), 'data'),
      { encoding: 'utf-8' }
    );
    collection = {};
    for (const filename of markdownFiles) {
      const fileData = fs.readFileSync(
        path.resolve(process.cwd(), 'data', filename),
        { encoding: 'utf-8' }
      );
      const meta = parseFrontMatterIntoStoryType(fileData);
      const collectionKeyIdentifier = `s${meta.seasonKey}e${meta.episodeKey}`;
      Object.assign(collection, { [collectionKeyIdentifier]: meta });
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
