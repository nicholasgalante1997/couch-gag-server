import path from 'path';
import fs from 'fs';
import { log } from 'couch-gag-common-lib';

function cleanVercel() {
  const vercelPath = path.resolve(process.cwd(), 'v_out');
  const dirExists = fs.existsSync(vercelPath);
  if (dirExists) {
    try {
      const logMessage =
        'Beginning cleanVercel operation @' +
        new Date().toISOString() +
        ' with path of ' +
        vercelPath;
      log('info', logMessage);
    } catch (e) {
      log('error', (e as Error).message);
    }
  } else {
    log('error', 'v_out does not currently exist as a directory!');
  }
}

cleanVercel();
