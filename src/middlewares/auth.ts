import { NextFunction, Response } from 'express';
import { RequestTypeWithUserData } from '../types';
import { decodeToken } from '../utils/token';
import { db } from '../db';

export const authGuard = async (
  req: RequestTypeWithUserData,
  _: Response,
  next: NextFunction
) => {
  const token = req.headers['token'] as string;

  if (!token) return next();

  const tokenData = decodeToken(token);

  const user = await db.prisma.findUserByEmail(tokenData?.email as string);

  if (user && req.context.userData) {
    req.context.userData.email = user.email;
    req.context.userData.userId = user.userId;
  }

  next();
};
