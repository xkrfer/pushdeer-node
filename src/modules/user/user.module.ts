import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PushDeerUsers } from '../../entity/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PushDeerUsers])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {
}
