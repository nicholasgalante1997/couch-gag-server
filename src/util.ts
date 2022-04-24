import { ServerResponse } from 'http';
import { MarkdownMeta } from './types';

export const storyDict: { [x: string]: MarkdownMeta } = {
    's01e01': {
        episodeKey: '01',
        seasonKey: '01',
        key: '0101',
        title: 'Life\'s a Couch Gag, Then You Die',
        subtitle: 'to do',
        genres: ['genesis', 'beauty', 'loathing']
    }
};

export function structValidResHeaders (res: ServerResponse) {
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'x-ulysses-key': process.env.ULYSSES_HASHED_KEY,
    });
}

