import { Controller, Get, HttpCode, Query, Post, Body } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { LoginService } from './login.service';
import { Code } from '../../helpers/utils';
import { AppleLoginDto } from '../../dto/user.dto';
import { APP_DEBUG } from '../../helpers/config';

@Controller('login')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
  ) {
  }

  @ApiOperation({ summary: '模拟登入' })
  @Get('fake')
  async fakeLogin() {
    if (APP_DEBUG) {
      const token = await this.loginService.fakeLogin();
      return {
        data: {
          token,
        },
        code: Code.DONE,
      };
    }
    return {
      code: Code.ARGS,
      error: 'Debug only',
    };

  }

  @ApiOperation({ summary: 'apple 登入' })
  @Post('idtoken')
  @HttpCode(200)
  async appleLogin(@Body() body: AppleLoginDto) {
    const token = await this.loginService.appleLogin(body);
    return {
      data: {
        token,
      },
      code: Code.DONE,
    };
  }
}
