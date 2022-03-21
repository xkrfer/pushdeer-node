import { Body, Controller, HttpCode, Post, Session, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
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
  async getUserInfo(@Session() session) {
    return {
      data: session.user,
      code: Code.DONE,
    };
  }

  @Post('merge')
  @HttpCode(200)
  @ApiOperation({ summary: '合并用户信息' })
  async mergeUser(@Session() session) {
    console.log('mergeUser');
    return {
      data: session.user,
      code: Code.DONE,
    };
  }
}
