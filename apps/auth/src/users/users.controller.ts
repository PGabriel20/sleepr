import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDocument } from 'apps/auth/src/users/models/user.schema';
import { JwtAuthGuard } from 'apps/auth/src/guards/jwt-auth.guard';
import { CurrentUser } from '@app/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(
    @CurrentUser() user: UserDocument
  ) {
    return user
  }
}
