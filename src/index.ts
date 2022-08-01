import { log } from '@nickgdev/couch-gag-common-lib';
import { server, PORT } from './server';

server.listen(PORT, () => {
  log('info', 'Server started on ' + PORT);
});
