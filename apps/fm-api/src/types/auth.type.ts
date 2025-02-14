import {UserRole} from '@prisma/client';

export type LoginResponse = {
    access_token: string;
};

export type JwtPayload = {
    userId: string;
    role: UserRole;
};

export enum AUTH_ERROR {
    WRONG_PASSWORD = 'Wrong password',
}
