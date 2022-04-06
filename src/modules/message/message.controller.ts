import {
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { ApiOperation } from '@nestjs/swagger';
import {
  ListMessageDto,
  ListMessageV2Dto,
  PushMessageDto,
  RemoveMessageDto,
} from '../../dto/message.dto';
import { AuthGuard } from '../../global/guard/auth.guard';
import { Code } from '../../helpers/utils';
import { Throttle } from '@nestjs/throttler';
import {
  MAX_EVERY_API_LIMIT_PER_MINUTE,
  MAX_PUSH_EVERY_USER_PER_MINUTE,
} from '../../helpers/config';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

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
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async remove(@Body() body: RemoveMessageDto, @Session() session) {
    const count = await this.messageService.remove(body, session.user);
    return {
      code: count > 0 ? Code.DONE : Code.ARGS,
      error: '消息不存在或已删除',
    };
  }

  @ApiOperation({ summary: '第二种list接口' })
  @Post('list_v2')
  @UseGuards(AuthGuard)
  @HttpCode(200)
  async listV2(@Body() body: ListMessageV2Dto, @Session() session) {
    const [messages, total] = await this.messageService.getListV2(
      body,
      session.user,
    );
    return {
      code: Code.DONE,
      data: {
        messages,
        total,
        page: body.page || 1,
        pageSize: body.pageSize || 10,
        totalPage: ~~(total / (body.pageSize || 10)) + 1,
      },
    };
  }

  @Get('ping')
  @UseGuards(AuthGuard)
  async ping(@Session() session) {
    const id = await this.messageService.ping(session.user);
    return {
      code: Code.DONE,
      data: id || 0,
    };
  }
}
