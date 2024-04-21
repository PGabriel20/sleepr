import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { AUTH_SERVICE, DatabaseModule, LoggerModule } from '@app/common';
import { ReservationsRepository } from 'apps/reservations/src/reservations.reposiutory';
import { ReservationDocument, ReservationSchema } from 'apps/reservations/src/models/reservation.shema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi'
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports: [
    LoggerModule,
    DatabaseModule,
    DatabaseModule.forFeature([{name: ReservationDocument.name, schema: ReservationSchema}]),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      })
    }),
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('AUTH_HOST'),
            port: configService.get('AUTH_PORT'),
          }
        }),
        inject: [ConfigService]
      }
    ])
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
