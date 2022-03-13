import {
  Controller,
  Get,
  HttpCode,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('login')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '模拟登入' })
  @Get('fake')
  async fakeLogin(@Session() session: Record<string, any>) {
    const token = await this.userService.fakeLogin();
    session.token = token;
    return {
      code: 0,
      token,
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
