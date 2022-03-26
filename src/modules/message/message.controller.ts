import {
  Body,
  Controller,
  Get,
  HttpCode, Logger,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { ApiOperation } from '@nestjs/swagger';
import {
  ListMessageDto,
  PushMessageDto,
  RemoveMessageDto,
} from '../../dto/message.dto';
import { AuthGuard } from '../../global/guard/auth.guard';
import { Code } from '../../helpers/utils';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { MAX_EVERY_API_LIMIT_PER_MINUTE, MAX_PUSH_EVERY_USER_PER_MINUTE } from '../../helpers/config';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {
  }

  @ApiOperation({ summary: '获得当前用户的消息列表' })
  @Post('list')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  @Throttle(Number(MAX_EVERY_API_LIMIT_PER_MINUTE), 60)
  async list(@Body() body: ListMessageDto, @Session() session) {
    const messages = await this.messageService.list(body, session.user);
    return {
      code: Code.DONE,
      data: {
        messages,
      },
    };
  }

  @ApiOperation({ summary: '推送消息' })
  @Post('push')
  @HttpCode(200)
  @Throttle(Number(MAX_PUSH_EVERY_USER_PER_MINUTE), 60)
  async push(@Body() body: PushMessageDto) {
    return {
      code: Code.DONE,
      data: await this.messageService.push(body),
    };
  }

  @ApiOperation({ summary: '推送消息GET请求' })
  @Get('push')
  @Throttle(Number(MAX_PUSH_EVERY_USER_PER_MINUTE), 60)
  async pushFormGet(@Query() query: PushMessageDto) {
    return {
      code: 0,
      data: await this.messageService.push(query),
    };
  }

  @ApiOperation({ summary: '删除消息' })
  @Post('remove')
  @HttpCode(200)
  async remove(@Body() body: RemoveMessageDto, @Session() session) {
    const count = await this.messageService.remove(body, session.user);
    return {
      code: count > 0 ? Code.DONE : Code.ARGS,
      error: '消息不存在或已删除',
    };
  }
}
