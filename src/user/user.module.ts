import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PushDeerUsers } from '../entity/users.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../guards/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([PushDeerUsers])],
  providers: [
    UserService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
