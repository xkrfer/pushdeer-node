import { Body, Controller, HttpCode, Post, Session, UseGuards } from '@nestjs/common';
import { KeyService } from './key.service';
import { ApiOperation } from '@nestjs/swagger';
import { GenKeyDto, ListKeyDto, ReGenKeyDto, RemoveKeyDto, RenameKeyDto } from '../../dto/key.dto';
import { AuthGuard } from '../../global/guard/auth.guard';
import { Code } from '../../helpers/utils';

@Controller('key')
@UseGuards(AuthGuard)
export class KeyController {
  constructor(
    private readonly keyService: KeyService,
  ) {
  }

  @ApiOperation({ summary: '生成一个新Key' })
  @Post('gen')
  @HttpCode(200)
  async gen(@Body() body: GenKeyDto, @Session() session) {
    let keys = await this.keyService.gen(body, session.user);
    return {
      code: Code.DONE,
      data: {
        keys,
      },
    };
  }

  @ApiOperation({ summary: '获取当前用户的Key列表' })
  @Post('list')
  @HttpCode(200)
  async list(@Body() body: ListKeyDto, @Session() session) {
    const keys = await this.keyService.list(session.user);
    return {
      code: Code.DONE,
      data: {
        keys,
      },
    };
  }

  @ApiOperation({ summary: '重置一个Key' })
  @Post('regen')
  @HttpCode(200)
  async regen(@Body() body: ReGenKeyDto, @Session() session) {
    const { affected } = await this.keyService.regen(body, session.user);
    return {
      code: affected > 0 ? Code.DONE : Code.ARGS,
      error: 'Key不存在或已删除',
    };
  }

  @ApiOperation({ summary: '重命名Key' })
  @Post('rename')
  @HttpCode(200)
  async rename(@Body() body: RenameKeyDto, @Session() session) {
    const { affected } = await this.keyService.rename(body, session.user);
    return {
      code: affected > 0 ? Code.DONE : Code.ARGS,
      error: 'Key不存在或已删除',
    };
  }

  @ApiOperation({ summary: '删除Key' })
  @Post('remove')
  @HttpCode(200)
  async remove(@Body() body: RemoveKeyDto, @Session() session) {
    const { affected } = await this.keyService.remove(body, session.user);
    return {
      code: affected > 0 ? Code.DONE : Code.ARGS,
      error: 'Key不存在或已删除',
    };
  }
}
