import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from 'apps/auth/src/users/user.repository';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository){}

  async create(createUserDto: CreateUserDto) {

    console.log('brcypt issue')

    try {
      return this.usersRepository.create({
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 10)
      });
      
    } catch (error) {
      console.log(error)
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({email})
    const passwordValid =  await bcrypt.compare(password, user.password)

    if(!passwordValid) {
      throw new UnauthorizedException("Credentials are not valid")
    }

    return user
  }
}
