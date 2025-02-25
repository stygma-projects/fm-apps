import {Request} from 'express'
import {UpdateUserDto} from '../dto/user/update-user.dto'
import {CreateUserDto} from '../dto/user/create-user.dto'
import {User} from "@fm-monorepo/db";

export type UserRequest = Request<
    {
        userId: string
    },
    object,
    CreateUserDto | UpdateUserDto
>

export type UserWithoutPassword = Omit<User, 'password'>

export enum USER_ERROR {
    NOT_FOUND_BY_ID = 'User ID not found',
    NOT_FOUND_BY_EMAIL = 'User email not found',
    NOT_FOUND = 'User not found',
}
