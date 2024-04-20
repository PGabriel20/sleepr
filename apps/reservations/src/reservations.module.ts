import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseModule, LoggerModule } from '@app/common';
import { ReservationsRepository } from 'apps/reservations/src/reservations.reposiutory';
import { ReservationDocument, ReservationSchema } from 'apps/reservations/src/models/reservation.shema';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi'


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
    })
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
