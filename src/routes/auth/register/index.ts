import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as admin from 'firebase-admin';
import { hashPassword } from '../../../utils/hashPassword';
import { TokenData, encodeToken } from '../../../utils/token';
import { nanoid } from 'nanoid';

export const registerRouter = async (req: Request, res: Response) => {
  const prisma = req.context.prisma;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return res
        .status(400)
        .send({ status: 'failure', error: 'User already exists' });
    }
    const hashedPassword = hashPassword(password);
    const newUser = await admin.auth().createUser({ email, password });

    await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        userId: nanoid(),
      },
    });

    const encodeData: TokenData = {
      email,
      uid: newUser.uid,
    };

    const token = encodeToken(encodeData);
    return res.send({
      status: 'success',
      message: 'User registered successfully',
      token,
    });
  } catch (error) {
    return res.status(400).send({ status: 'failure', error });
  }
};
