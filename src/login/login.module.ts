import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PushDeerUsers } from '../entity/users.entity';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([PushDeerUsers])],
  controllers: [LoginController],
  providers: [LoginService, UserService],
})
export class LoginModule {}
