import fs from 'fs';
import path from 'path';
import { router } from '../router';

const routes = Object.keys(router);

export function buildVercelLambda(lambdaNames: string[]) {
  for (const lambda of lambdaNames) {
    const fnTemplate = `import type { VercelRequest, VercelResponse } from '@vercel/node';
         import { router } from '../src/router.ts';

         export default (req: VercelRequest, res: VercelResponse) => {
            const handler = router['${lambda}'];
            handler(req, res);
         };
        `;
    fs.writeFileSync(
      path.resolve(process.cwd(), 'v_out', 'api', lambda + '.ts'),
      fnTemplate,
      { encoding: 'utf-8' }
    );
  }
}
