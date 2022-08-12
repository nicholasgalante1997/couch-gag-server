import { IncomingMessage, ServerResponse } from 'http';
import {
  handleAllMarkdownRoute,
  handleMarkdownStoryRoute,
  catchAllRoute,
  createUserHandler,
  getUserThemeTreatment,
} from './handlers';

export const router = {
  '/all': handleAllMarkdownRoute,
  '/markdown': handleMarkdownStoryRoute,
  '/theme': getUserThemeTreatment,
  default: (_req: IncomingMessage, res: ServerResponse) => {
    catchAllRoute(res);
  }
};
