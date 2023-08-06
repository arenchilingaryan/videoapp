import { Request } from 'express';

export type UserType = {
  email: string;
  password: string;
  id: string;
  userId: string;
};

export type RequestTypeWithUserData = Request & {
  userData?: Omit<UserType, 'password'>;
};

export type ErrorValidationType = {
  status: number;
  message: string;
};
