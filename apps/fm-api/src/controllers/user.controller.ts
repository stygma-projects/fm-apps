import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { UserWithoutPassword } from '../types/user.type';
import { UpdateUserDto } from '../dto/user/update-user.dto';
import { UserExistsGuard } from '../guards/user-exists.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserWithoutPassword> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  async findAll(): Promise<UserWithoutPassword[]> {
    return this.usersService.findAll();
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get a user by id' })
  async findOneById(
    @Param('userId', new ParseUUIDPipe()) userId: string,
  ): Promise<UserWithoutPassword | null> {
    return this.usersService.findOneById(userId);
  }

  @Patch(':userId')
  @ApiOperation({ summary: 'Update a user by id' })
  @UseGuards(JwtAuthGuard, UserExistsGuard)
  async update(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserWithoutPassword> {
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete(':userId')
  @ApiOperation({ summary: 'Delete a user by id' })
  @UseGuards(JwtAuthGuard, UserExistsGuard)
  async remove(
    @Param('userId', new ParseUUIDPipe()) userId: string,
  ): Promise<UserWithoutPassword> {
    return this.usersService.remove(userId);
  }
}
