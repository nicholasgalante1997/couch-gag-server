import { Request, Response } from 'express';
import { log, heller_couch_view_theme_treatment_pool, Theme, Treatment, UserTreatment } from '@nickgdev/couch-gag-common-lib';
import { firestore } from '../utils/google/firestore';
import { StatusCodes } from './../utils/status-codes';

export async function getUserThemeTreatment(req: Request, res: Response) {
  log('info', 'beginning user theme treatment pull...')

  let treatments = [];

  const { ViewThemeTreatments: vts } = heller_couch_view_theme_treatment_pool;

  const uId = req.body?.uId;
  const cId = req.body?.cId;

  log('info', `uId is ${uId};`);
  log('info', `cId is ${cId};`);

  // unknown user - control treatments
  if (!uId && !cId) {

    log('info', 'unknown user - reqId - ' + req.get('x-request-id'));
    log('info', 'Assigning control treatments.');

    treatments = vts.filter((t) => t.control) as Treatment<Theme>[];

    log('info', 'Returning successful response.');

    res.status(StatusCodes.OK).json({ data: { themeOptions: treatments }});
    return;
  }

  // get user treatments
  log('info', 'Attempting to pull user theme treatments from the cloud...');
  try {
    const docRef = firestore.doc('user_treatments/' + uId);
    const docContent = await docRef.get();

    if (!docContent.exists) {
      log('error', 'cant connect to db; document does not exist.');
      treatments = vts.filter((t) => t.control) as Treatment<Theme>[];
      res.status(StatusCodes.FAIL_SAFE).json({ data: { themeOptions: treatments }, error: 'could not retrieve \'user-treatments\' document. indicates a failure to pull cloud data.' });
      return;
    } else {
      const data = docContent.data() as {
        theme: {
          treatments: Treatment<Theme>[];
        }
      } | undefined;
      treatments = vts.filter(vt => { 
        if (data?.theme?.treatments[0].id === vt.id) return true;
        return false;
      });
  
      if (treatments.length === 0) { // assign a treatment
        treatments.push(vts[Math.floor(Math.random() * (vts.length - 1))])
        try {
          await docRef.set({
            theme: {
              treatments
            }
          }, 
          {
            merge: true
          })
        } catch (e: any) {
          
        }
      }
  
      res.status(StatusCodes.OK).json({ data: { themeOptions: treatments }});
      return; 
    }
  } catch (e: any) {
    log('error', JSON.stringify(e));
  }
}