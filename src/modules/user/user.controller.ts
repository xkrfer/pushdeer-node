import {
  Body,
  Controller, Get,
  HttpCode,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '../../global/guard/auth.guard';
import { Code } from '../../helpers/utils';
import { RedisCoreService } from '../redis-core/redis-core.service';
import { FCM_PUBLIC_KEY } from '../../helpers/config';

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

  @Get('config')
  @HttpCode(200)
  @ApiOperation({ summary: '获取配置' })
  async getConfig() {
    return {
      data: {
        fcm_public_key: FCM_PUBLIC_KEY,
      },
      code: Code.DONE,
    };
  }
}
