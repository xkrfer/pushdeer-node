import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 53306,
      username: 'root',
      password: 'theVeryp@ssw0rd',
      database: 'pushdeer',
      entities: [__dirname + '/../entity/*.entity{.ts,.js}'],
      synchronize: true,
      timezone: '+08:00',
      charset:"utf8mb4"
    }),
  ],
})
export class DbModule {
}
