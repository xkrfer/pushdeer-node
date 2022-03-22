import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigInterface } from '../config/config.type';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const dbConfig = configService.get<ConfigInterface>('db');
        return {
          entities: [__dirname + '/../entity/*.entity{.ts,.js}'],
          synchronize: true,
          charset: 'utf8mb4',
          host: 'localhost',
          timezone: '+08:00',
          ...dbConfig,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DbModule {
}
