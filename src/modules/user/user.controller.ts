import { Body, Controller, HttpCode, Post, Session, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UserInfoDto } from '../../dto/user.dto';
import { AuthGuard } from '../../global/guard/auth.guard';
import { Code } from '../../helpers/utils';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor() {
  }

  @Post('info')
  @HttpCode(200)
  @ApiOperation({ summary: '获取用户信息' })
  async getUserInfo(@Body() body: UserInfoDto, @Session() session) {
    return {
      data: session.user,
      code: Code.DONE,
    };
  }
}
