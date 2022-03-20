import { ApiProperty } from '@nestjs/swagger';
import { AuthDto } from './auth.dto';

export class ListMessageDto extends AuthDto {
  @ApiProperty({ description: '消息条数-默认为10，最大100', example: 20, required: false })
  limit: number;

  @ApiProperty({ description: '从指定消息处开始获取消息', example: 1, required: false })
  since_id: number;
}

export class RemoveMessageDto extends AuthDto {
  @ApiProperty({ description: 'Key ID', example: 1, required: true })
  id: number;
}

export class PushMessageDto {
  @ApiProperty({ description: 'PushKey, 多个key用,隔开', example: 'xxxxx', required: true })
  pushkey: string;

  @ApiProperty({ description: '推送消息内容', example: '推送内容', required: true })
  text: string;

  @ApiProperty({ description: '推送消息内容', example: '推送内容', required: true })
  desp: string;

  @ApiProperty({ description: '格式，选填-文本=text，markdown，图片=image，默认为markdown', example: 'markdown', required: false })
  type: string;
}
