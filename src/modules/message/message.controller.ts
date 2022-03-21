import {
  Controller,
  HttpCode,
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

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @ApiOperation({ summary: '获得当前用户的消息列表' })
  @Post('list')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async list(@Query() query: ListMessageDto, @Session() session) {
    const messages = await this.messageService.list(query, session.user);
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
  async push(@Query() query: PushMessageDto) {
    return {
      code: 0,
      content: await this.messageService.push(query),
    };
  }

  @ApiOperation({ summary: '删除消息' })
  @Post('remove')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async remove(@Query() query: RemoveMessageDto, @Session() session) {
    const count = await this.messageService.remove(query, session.user);
    return {
      code: count > 0 ? Code.DONE : Code.ARGS,
      error: '消息不存在或已删除',
    };
  }
}
