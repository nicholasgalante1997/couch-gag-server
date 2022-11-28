import http from 'http';
import dotenv from 'dotenv';
import express from 'express';
import { router } from './router';
import {
  bareMinCors,
  checkValidUrl,
  fwdOptions,
  verifyUlyssesKey
} from './middleware';

dotenv.config();

export const PORT = process.env.PORT || (2023 as const);

const app = express();

/** middleware */

/** locally defined cors */
app.use(bareMinCors);

/** handle options prefetch */
app.use(fwdOptions);

/** handle invalid url on request */
app.use(checkValidUrl);

/** verify ulysses key */
app.use(verifyUlyssesKey);

// body parser
app.use(express.json());

/** end middleware, begin routes */

app.get('/all', router['/all']);

app.get('/markdown', router['/markdown']);

app.use('*', router.default);

export const server = http.createServer(app);
