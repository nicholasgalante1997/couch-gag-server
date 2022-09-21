import { Request, Response } from 'express';
import { log } from '@nickgdev/couch-gag-common-lib';
import { StatusCodes } from './../utils/status-codes';
import {
  getUserThemeTreatments,
  getThemeBySearchTerm
} from '../services/theme';

export async function handleUserThemeTreatmentRoute(
  req: Request,
  res: Response
) {
  log('info', 'Beginning #handleUserThemeTreatmentRouteService');

  const uId = req.body?.uId;
  const cId = req.body?.cId;

  const devEnvOverride: string | string[] | undefined =
    req.body?.devEnvThemeOverride;

  devEnvOverride &&
    log(
      'info',
      'Development theme override passed. Search Terms: ' +
        JSON.stringify(devEnvOverride)
    );

  if (devEnvOverride) {
    res.status(StatusCodes.OK).json({
      data: {
        themeOptions: getThemeBySearchTerm(devEnvOverride)
      }
    });
    return;
  }

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
