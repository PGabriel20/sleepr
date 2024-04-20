import { ConfigModule } from '@app/common/config/config.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      uri: configService.get('MONGODB_URI')
    }),
    inject: [ConfigService]
  })]
})

export class DatabaseModule {
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models)
  }
}
