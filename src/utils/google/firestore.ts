import { Firestore } from '@google-cloud/firestore';
import path from 'path';

export const firestore = new Firestore({
    keyFilename: path.resolve(process.cwd(), 'couch-gag-gcred.json'),
    projectId: 'couch-gag'
});