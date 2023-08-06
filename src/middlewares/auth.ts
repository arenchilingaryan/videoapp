import { NextFunction, Response } from 'express';
import { RequestTypeWithUserData } from '../types';
import { decodeToken } from '../utils/token';

export const authGuard = async (
  req: RequestTypeWithUserData,
  _: Response,
  next: NextFunction
) => {
  const token = req.headers['token'] as string;

  const tokenData = decodeToken(token);

  const prisma = req.context.prisma;
  const user = await prisma.user.findUnique({
    where: {
      email: tokenData?.email,
    },
  });

  if (user && req.context.userData) {
    req.context.userData.email = user.email;
    req.context.userData.userId = user.userId;
  }

  next();
};
