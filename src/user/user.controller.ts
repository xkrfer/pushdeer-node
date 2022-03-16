import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation } from '@nestjs/swagger';
import { UserInfoDto } from '../dto/user-info.dto';
import { sessionMap } from '../constant';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('info')
  @HttpCode(200)
  @ApiOperation({ summary: '获取用户信息' })
  async getUserInfo(@Body() body: UserInfoDto) {
    const { token } = body;
    const user = sessionMap.get(token);
    if (!token || !user) {
      return {
        code: 80403,
        error: '当前用户没有足够的权限访问此接口',
      };
    }
    return {
      code: 0,
      content: user,
    };
  }
}
