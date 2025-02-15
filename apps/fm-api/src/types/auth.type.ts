import {UserRole} from "@prisma/client";

export interface LoginResponse {
    access_token: string
}

export interface JwtPayload {
    userId: string
    role: UserRole
}

export enum AUTH_ERROR {
    WRONG_PASSWORD = 'Wrong password',
}
