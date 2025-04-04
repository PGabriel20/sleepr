import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { TokenPayload } from "apps/auth/src/interfaces/token-payload.interface";
import { UsersService } from "apps/auth/src/users/users.service";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService
  ){
    super(
      {jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => request?.cookies?.Authentication || request?.Authentication
      ]),
      secretOrKey: configService.get('JWT_SECRET')
    })
  }

  async validate({userId}: TokenPayload) {
    return this.usersService.getUser({_id: userId})
  }
}