import { Request } from 'express';
import { Responses } from 'node-themoviedb';

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

export type Movie = Responses.Search.Movies['results'][0];
