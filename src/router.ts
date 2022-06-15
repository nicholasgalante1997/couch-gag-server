import { IncomingMessage, ServerResponse } from 'http';
import { log } from './log';
import { catchAllRoute, getAllStories, getStoryFileById } from './service';
import { structValidResHeaders } from './util';

export const router = {
  '/all': (req: IncomingMessage, res: ServerResponse) => {
    log('info', "Beginning 'all' route operations.");
    structValidResHeaders(res);
    const data = getAllStories();
    if (!data) {
      res.end(
        JSON.stringify({
          issueCode: 1,
          errorType:
            '/all::GetAllStoriesOperation::fs::' + new Date().toDateString()
        })
      );
      return;
    }
    res.end(JSON.stringify(data));
    log('info', "'all' route operations complete.");
    return;
  },
  '/markdown': (req: IncomingMessage, res: ServerResponse) => {
    let err = false;
    log('info', "Beginning 'markdown' route operations.");
    try {
      const data = getStoryFileById(req);
      structValidResHeaders(res);
      res.end(JSON.stringify(data));
    } catch (e: any) {
      err = true;
      log('error', e.message || JSON.stringify(e));
      res.writeHead(500, 'Server Issue: issue source::' + JSON.stringify(e));
    } finally {
      err
        ? (() =>
            log('error', 'Error thrown during markdown route operations.'))()
        : (() =>
            log(
              'info',
              "Completed 'markdown' route operations successfully"
            ))();
      return;
    }
  },
  default: (req: IncomingMessage, res: ServerResponse) => {
    catchAllRoute(res);
  }
};
