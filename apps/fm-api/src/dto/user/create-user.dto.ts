import {IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength,} from 'class-validator'
import {UserRole} from "@prisma/client";


export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email!: string

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password!: string

    @IsString()
    @IsNotEmpty()
    firstName!: string

    @IsString()
    @IsNotEmpty()
    lastName!: string

    @IsString()
    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole
}
