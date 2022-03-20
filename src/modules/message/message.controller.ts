import { Body, Controller, HttpCode, Post, Session, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { ApiOperation } from '@nestjs/swagger';
import { ListMessageDto, PushMessageDto, RemoveMessageDto } from '../../dto/message.dto';
import { AuthGuard } from '../../global/guard/auth.guard';
import { Code } from '../../helpers/utils';

@Controller('message')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
  ) {
  }

  @ApiOperation({ summary: '获得当前用户的消息列表' })
  @Post('/list')
  @HttpCode(200)
  @UseGuards(AuthGuard)
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
  @Post('/push')
  @HttpCode(200)
  async push(@Body() body: PushMessageDto) {
    return {
      code: 0,
      content: await this.messageService.push(body),
    };
  }

  @ApiOperation({ summary: '删除消息' })
  @Post('/remove')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async remove(@Body() body: RemoveMessageDto, @Session() session) {
    const count = await this.messageService.remove(body, session.user);
    return {
      code: count > 0 ? Code.DONE : Code.ARGS,
      error: '消息不存在或已删除',
    };
  }
}
