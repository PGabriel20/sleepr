import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from 'apps/auth/src/users/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository){}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
  }
}
