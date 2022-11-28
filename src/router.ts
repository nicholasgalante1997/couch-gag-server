import { IncomingMessage, ServerResponse } from 'http';
import {
  handleAllMarkdownRoute,
  handleMarkdownStoryRoute,
  catchAllRoute
} from './handlers';

export const router = {
  '/all': handleAllMarkdownRoute, // get all stories
  '/markdown': handleMarkdownStoryRoute, // get a single story
  default: (_req: IncomingMessage, res: ServerResponse) => { // unhandled routes
    catchAllRoute(res);
  }
};
