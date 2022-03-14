import {
  Body,
  Controller, HttpCode, Post
} from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiOperation } from "@nestjs/swagger";
import { UserInfoDto } from "../dto/user-info.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post("info")
  @HttpCode(200)
  @ApiOperation({ summary: "获取用户信息" })
  // @ApiBody({ description: '用户token'})
  async getUserInfo(@Body() body:UserInfoDto) {
    return body;
  }

}
