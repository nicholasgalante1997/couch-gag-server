import {
  log,
  heller_couch_view_theme_treatment_pool,
  Theme,
  Treatment
} from '@nickgdev/couch-gag-common-lib';

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
    return POOL.filter((vt) => vt.id.includes(tidSlice));
  } else {
    return POOL.filter((vt) => includesNTerms(vt.id, tidSlice));
  }
}
