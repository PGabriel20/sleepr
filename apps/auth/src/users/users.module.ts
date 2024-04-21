import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '@app/common';
import { UserDocument, UserSchema } from 'apps/auth/src/users/models/user.schema';
import { UsersRepository } from 'apps/auth/src/users/user.repository';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([{name: UserDocument.name, schema: UserSchema}])
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService]
})
export class UsersModule {}
