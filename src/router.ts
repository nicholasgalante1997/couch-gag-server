import { IncomingMessage, ServerResponse } from 'http';
import { log } from '@nickgdev/couch-gag-common-lib';
import { structValidResHeaders } from './middleware/response';
import {
  handleAllMarkdownRoute,
  handleMarkdownStoryRoute,
  catchAllRoute
} from './handlers';

export const router = {
  '/all': handleAllMarkdownRoute,
  '/markdown': handleMarkdownStoryRoute,
  '/theme': (req: IncomingMessage, res: ServerResponse) => {
    let err = false;
    log('info', 'Beginning theme treatment operations');
    structValidResHeaders(res);
    // fetch theme if its been associated to a user
    // if theres no assoc, create a view-theme-user assoc
    return;
  },
  default: (_req: IncomingMessage, res: ServerResponse) => {
    catchAllRoute(res);
  }
};
