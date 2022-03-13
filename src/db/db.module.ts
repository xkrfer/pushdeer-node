import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'theVeryp@ssw0rd',
      database: 'pushdeer',
      entities: [__dirname + '/../entity/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
})
export class DbModule {}
