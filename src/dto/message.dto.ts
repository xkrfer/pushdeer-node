import { ApiProperty } from '@nestjs/swagger';
import { AuthDto } from './auth.dto';
import { IsNotEmpty, IsOptional, Matches, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ListMessageDto extends AuthDto {
  @ApiProperty({ description: '消息条数-默认为10，最大100', example: 20, required: false })
  @Max(100, { message: 'limit 范围为10-100' })
  @Min(10, { message: 'limit 范围为10-100' })
  @Type(() => Number)
  limit: number;

  @ApiProperty({ description: '从指定消息处开始获取消息', example: 1, required: false })
  @Matches(/^\+?[1-9][0-9]*$/, { message: '消息id错误' })
  @IsOptional()
  since_id: number;
}

export class RemoveMessageDto extends AuthDto {
  @ApiProperty({ description: 'Message ID', example: 1, required: true })
  @Matches(/^\+?[1-9][0-9]*$/, { message: 'message id错误' })
  id: number;
}

export class PushMessageDto {
  @ApiProperty({ description: 'PushKey, 多个key用,隔开', example: 'xxxxx', required: true })
  @IsNotEmpty({ message: 'pushkey不允许为空' })
  pushkey: string;

  @ApiProperty({ description: '推送消息内容', example: '推送内容', required: true })
  @IsNotEmpty({ message: 'text不允许为空' })
  text: string;

  @ApiProperty({ description: '推送消息内容', example: '推送内容', required: false })
  @IsOptional()
  desp: string;

  @ApiProperty({ description: '格式，选填-文本=text，markdown，图片=image，默认为markdown', example: 'markdown', required: false })
  @Matches(/^(text|markdown|image)$/, { message: 'type:消息类型错误，文本=text，markdown，图片=image，默认为markdown' })
  type: string;
}
