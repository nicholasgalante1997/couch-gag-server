import { Request, Response } from 'express';
import { v4 } from 'uuid';
import { User, log } from '@nickgdev/couch-gag-common-lib';

import { USER_REGISTRY_INVALID_EMAIL, colloqIdRegister } from '../utils';

export function getUserHandler(req: Request, res: Response) {
  res.status(200).json({ foo: 'bar' });
}

export function createUserHandler(req: Request, res: Response) {
  const {
    email,
    cId = colloqIdRegister(),
    password
  } = req.body as Pick<User, 'cId' | 'email' | 'password'>;

  if (!email) {
    res.status(501).json({ error: USER_REGISTRY_INVALID_EMAIL });
    return;
  }

  const user: User = {
    id: v4(),
    cId,
    email,
    password
  };

  log('info', JSON.stringify(user));

  res.status(201).json(user);
}
