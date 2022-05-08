import { ServerResponse } from 'http';

export function structValidResHeaders (res: ServerResponse) {
    res.writeHead(200, {
        'Content-Type': 'application/json',
    });
}