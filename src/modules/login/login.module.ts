import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PushDeerUsers } from '../../entity/users.entity';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([PushDeerUsers])],
  controllers: [LoginController],
  providers: [LoginService, UserService],
})
export class LoginModule {
}
