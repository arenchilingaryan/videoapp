export declare type TokenData = {
    uid: string;
    email: string;
};
export declare const encodeToken: (data: TokenData) => string;
export declare const decodeToken: (token: string) => TokenData | null;
