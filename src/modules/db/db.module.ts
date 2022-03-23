import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME } from 'src/helpers/config';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      synchronize: true,
      charset: 'utf8mb4',
      timezone: '+08:00',
      type: 'mariadb',
      port: Number(DB_PORT),
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      host: DB_HOST,
      entities: [__dirname + '/../../entity/*.entity{.ts,.js}'],
    }),
  ],
})
export class DbModule {
}


