import { log } from '@nickgdev/couch-gag-common-lib';
import { IncomingMessage, ServerResponse } from 'http';
import { structValidResHeaders } from '../middleware';
import { getAllStories, getStoryFileById } from '../services';

export const handleAllMarkdownRoute = (
  _req: IncomingMessage,
  res: ServerResponse
) => {
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
};

export const handleMarkdownStoryRoute = (
  req: IncomingMessage,
  res: ServerResponse
) => {
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
      ? (() => log('error', 'Error thrown during markdown route operations.'))()
      : (() =>
          log('info', "Completed 'markdown' route operations successfully"))();
    return;
  }
};
