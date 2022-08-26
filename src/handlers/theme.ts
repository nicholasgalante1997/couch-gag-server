import { Request, Response } from 'express';
import { log } from '@nickgdev/couch-gag-common-lib';
import { StatusCodes } from './../utils/status-codes';
import { getUserThemeTreatments, getSingleTheme } from '../services/theme';

export async function handleUserThemeTreatmentRoute(
  req: Request,
  res: Response
) {
  const uId = req.body?.uId;
  const cId = req.body?.cId;

  const devEnvOverride = req.body?.devEnvThemeOverride;

  if (devEnvOverride) {
    res.status(StatusCodes.OK).json({
      data: {
        themeOptions: getSingleTheme(devEnvOverride)
      }
    });
    return;
  }

  log('info', `uId is ${uId};`);
  log('info', `cId is ${cId};`);

  const treatmentsMeta = await getUserThemeTreatments(uId, cId);
  const body: Record<string, any> = {};

  body.data = {
    themeOptions: treatmentsMeta.treatments
  };

  if (treatmentsMeta.isError) {
    body.error = treatmentsMeta.error;
    res.status(treatmentsMeta.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR);
  } else {
    res.status(StatusCodes.OK);
  }

  res.json(body);
}
