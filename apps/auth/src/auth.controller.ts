import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'apps/auth/src/guards/local-auth.guard';
import { Response } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtAuthGuard } from 'apps/auth/src/guards/jwt-auth.guard';
import { CurrentUser, UserDocument } from '@app/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: UserDocument, @Res({passthrough: true}) response: Response) {
    await this.authService.login(user, response)
    response.send(user)
  }

  //RPC calls via tcp for checking auth
  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  async authenticate(@Payload() data: any) {
    return data.user
  }
}
