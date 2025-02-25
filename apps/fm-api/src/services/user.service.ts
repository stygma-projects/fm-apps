import {Injectable, NotFoundException} from '@nestjs/common'
import {PrismaService} from './prisma.service'
import {hash} from 'bcrypt'
import {CreateUserDto} from '../dto/user/create-user.dto'
import {UpdateUserDto} from '../dto/user/update-user.dto'
import {USER_ERROR, UserWithoutPassword} from '../types/user.type'
import {User} from  "@fm-monorepo/db";

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {
    }

    async create(createUserPayload: CreateUserDto): Promise<UserWithoutPassword> {
        const hashedPassword = await hash(createUserPayload.password, 10)
        return this.prisma.user.create({
            data: {
                ...createUserPayload,
                password: hashedPassword,
            },
        })
    }

    findAll(): Promise<UserWithoutPassword[]> {
        return this.prisma.user.findMany()
    }

    async findOneById(userId: string): Promise<UserWithoutPassword> {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        })

        if (!user) {
            throw new NotFoundException(USER_ERROR.NOT_FOUND_BY_ID)
        }
        return user
    }

    async findOneByEmail(email: string): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        })

        if (!user) {
            throw new NotFoundException(USER_ERROR.NOT_FOUND_BY_EMAIL)
        }
        return user
    }

    async findOne(userId?: string, email?: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                OR: [{id: userId}, {email}],
            },
        })

        if (!user) {
            throw new NotFoundException(USER_ERROR.NOT_FOUND_BY_EMAIL)
        }
        return user
    }

    async update(
        userId: string,
        updateUserPayload: UpdateUserDto,
    ): Promise<UserWithoutPassword> {
        return this.prisma.user.update({
            where: {
                id: userId,
            },
            data: updateUserPayload,
        })
    }

    async remove(userId: string): Promise<UserWithoutPassword> {
        return this.prisma.user.delete({
            where: {
                id: userId,
            },
        })
    }
}
