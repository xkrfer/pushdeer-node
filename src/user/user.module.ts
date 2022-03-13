import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PushDeerUsers } from '../entity/users.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANT } from './jwt.constant';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([PushDeerUsers]),
    PassportModule,
    JwtModule.register({
      secret: JWT_CONSTANT.secret,
      signOptions: {
        expiresIn: '365d',
      },
    })],
  providers: [UserService, {
    provide: APP_GUARD,
    useClass: AuthGuard,
  }],
  controllers: [UserController],
})
export class UserModule {
}
