import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guard/auth.guard';
import { UserInfoDto } from '../dto/user-info.dto';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('info')
  @HttpCode(200)
  @ApiOperation({ summary: '获取用户信息' })
  async getUserInfo(@Req() req, @Body() body: UserInfoDto) {
    if (!req.user) {
      return {
        code: 80403,
        error: '当前用户没有足够的权限访问此接口',
      };
    }
    return {
      code: 0,
      content: req.user,
    };
  }
}
