import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { LoginService } from './login.service';
import { Code } from '../../helpers/utils';
import { AppleLoginDto } from '../../dto/user.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {
  }

  @ApiOperation({ summary: '模拟登入' })
  @Get('fake')
  async fakeLogin() {
    const token = await this.loginService.fakeLogin();
    return {
      data: {
        token,
      },
      code: Code.DONE,
    };
  }

  @ApiOperation({ summary: 'apple 登入' })
  @Post('idtoken')
  @HttpCode(200)
  async appleLogin(@Body() body: AppleLoginDto) {
    return {
      data: {
        user: await this.loginService.appleLogin(body),
      },
      code: Code.DONE,
    };
  }

  @ApiOperation({ summary: '微信code登入' })
  @Post('wecode')
  @HttpCode(200)
  wxCodeLogin() {
    console.log('wxCodeLogin');
    return 'wxCodeLogin';
  }

  @ApiOperation({ summary: '微信union id登入' })
  @Post('unoinid')
  @HttpCode(200)
  wxUnionIdLogin() {
    console.log('unoinid');
    return 'wxUnionIdLogin';
  }
}
