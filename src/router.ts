import { IncomingMessage, ServerResponse } from 'http';
import {
  handleAllMarkdownRoute,
  handleMarkdownStoryRoute,
  catchAllRoute,
  createUserHandler,
  handleUserThemeTreatmentRoute
} from './handlers';

export const router = {
  '/all': handleAllMarkdownRoute,
  '/markdown': handleMarkdownStoryRoute,
  '/theme': handleUserThemeTreatmentRoute,
  default: (_req: IncomingMessage, res: ServerResponse) => {
    catchAllRoute(res);
  }
};
