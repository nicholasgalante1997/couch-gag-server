import {
  log,
  heller_couch_view_theme_treatment_pool,
  Theme,
  Treatment
} from '@nickgdev/couch-gag-common-lib';
import { firestore } from '../utils/google/firestore';
import { StatusCodes } from './../utils/status-codes';

const POOL = heller_couch_view_theme_treatment_pool.ViewThemeTreatments;

function includesNTerms(t: string, trms: string[]) {
  let flag = true;
  for (const trm of trms) {
    if (!t.includes(trm)) flag = false;
  }
  return flag;
}

export function getThemeBySearchTerm(tidSlice: string | string[]) {
  if (typeof tidSlice === 'string') {
    return POOL.filter(vt => vt.id.includes(tidSlice));
  } else {
    return POOL.filter(vt => includesNTerms(vt.id, tidSlice));
  }
}

export async function getUserThemeTreatments(
  uId?: string,
  cId?: string,
  cookie?: string
): Promise<{
  treatments: Treatment<Theme>[];
  isError: boolean;
  error?: string;
  statusCode?: StatusCodes;
}> {
  log('info', 'beginning user theme treatment pull...');
  let treatments: Treatment<Theme>[] = [];
  const { ViewThemeTreatments: vts } = heller_couch_view_theme_treatment_pool;

  // unknown user - control treatments
  if (!uId && !cId) {
    log('info', 'unknown user');
    log('info', 'Assigning control treatments.');
    treatments = vts.filter((t) => t.control) as Treatment<Theme>[];
    log('info', 'Returning successful default response.');
    return { treatments, isError: false };
  }

  // get user treatments
  log('info', 'Attempting to pull user theme treatments from the cloud...');
  try {
    const docRef = firestore.doc('user_treatments/' + uId);
    const docContent = await docRef.get();

    if (!docContent.exists) {
      log('error', 'cant connect to db; document does not exist.');
      treatments = vts.filter((t) => t.control) as Treatment<Theme>[];
      return {
        treatments,
        isError: true,
        statusCode: StatusCodes.FAIL_SAFE,
        error:
          "could not retrieve 'user-treatments' document. indicates a failure to pull cloud data."
      };
    } else {
      const data = docContent.data() as
        | {
            theme: {
              treatments: Treatment<Theme>[];
            };
          }
        | undefined;
      treatments = vts.filter((vt) => {
        if (data?.theme?.treatments[0].id === vt.id) return true;
        return false;
      });

      if (treatments.length === 0) {
        // assign a treatment
        treatments.push(vts[Math.floor(Math.random() * (vts.length - 1))]);
        try {
          await docRef.set(
            {
              theme: {
                treatments
              }
            },
            {
              merge: true
            }
          );
        } catch (e: any) {
          throw new Error(e);
        }
      }
      return { treatments, isError: false };
    }
  } catch (e: any) {
    log('error', JSON.stringify(e));
    return {
      treatments: vts.filter((vt) => vt.control),
      isError: true,
      statusCode: StatusCodes.FAIL_SAFE,
      error: JSON.stringify(e)
    };
  }
}
