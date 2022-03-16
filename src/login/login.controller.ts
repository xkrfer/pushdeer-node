import { Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @ApiOperation({ summary: '模拟登入' })
  @Get('fake')
  async fakeLogin() {
    const token = await this.loginService.fakeLogin();
    return {
      code: 0,
      content: {
        token,
      },
    };
  }

  @ApiOperation({ summary: 'apple 登入' })
  @Post('idtoken')
  @HttpCode(200)
  appleLogin() {
    return 'appleLogin';
  }

  @ApiOperation({ summary: '微信code登入' })
  @Post('wecode')
  @HttpCode(200)
  wxCodeLogin() {
    return 'wxCodeLogin';
  }

  @ApiOperation({ summary: '微信union id登入' })
  @Post('unoinid')
  @HttpCode(200)
  wxUnionIdLogin() {
    return 'wxUnionIdLogin';
  }
}
