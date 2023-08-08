import { Request } from 'express';
import { Responses } from 'node-themoviedb';
export declare type UserType = {
    email: string;
    password: string;
    id: string;
    userId: string;
};
export declare type RequestTypeWithUserData = Request & {
    userData?: Omit<UserType, 'password'>;
};
export declare type ErrorValidationType = {
    status: number;
    message: string;
};
export declare type Movie = Responses.Search.Movies['results'][0];
