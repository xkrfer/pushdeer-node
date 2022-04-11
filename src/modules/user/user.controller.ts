import {
  Body,
  Controller,
  HttpCode,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '../../global/guard/auth.guard';
import { Code } from '../../helpers/utils';
import { RedisCoreService } from '../redis-core/redis-core.service';
@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  @Post('info')
  @HttpCode(200)
  @ApiOperation({ summary: '获取用户信息' })
  async getUserInfo(@Session() session) {
    return {
      data: session.user,
      code: Code.DONE,
    };
  }

  @Post('logout')
  @HttpCode(200)
  @ApiOperation({ summary: '退出' })
  async logout(@Body() body) {
    const { token } = body;
    return {
      data: await RedisCoreService.remove(token),
      code: Code.DONE,
    };
  }
}
