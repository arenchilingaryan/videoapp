import { UserType } from '../types';

// to make the file a module and avoid the TypeScript error
export {};

declare global {
  namespace Express {
    export interface Request {
      context: {
        userData: Omit<UserType, 'password'>;
      };
    }
  }
}

declare module 'hpagent';
