import { IsEmail, IsString, Matches, MinLength } from 'class-validator'
import { PASSWORD_REGEX } from '../regex'

export class AuthDto {
  @IsString()
  @IsEmail()
  email!: string

  @IsString()
  @MinLength(8)
  @Matches(PASSWORD_REGEX, { message: "Password don't match regex" })
  password!: string
}
