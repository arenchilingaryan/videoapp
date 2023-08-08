import { NextFunction, Response } from 'express';
import { RequestTypeWithUserData } from '../types';
export declare const authGuard: (req: RequestTypeWithUserData, _: Response, next: NextFunction) => Promise<void>;
