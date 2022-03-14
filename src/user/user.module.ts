import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PushDeerUsers } from "../entity/users.entity";
import { JwtModule } from "@nestjs/jwt";
import { Jwt_CONSTANT } from "./jwt.constant";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    TypeOrmModule.forFeature([PushDeerUsers]),
    JwtModule.register({
      secret: Jwt_CONSTANT.secret
    })],
  providers: [UserService, JwtStrategy],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {
}
