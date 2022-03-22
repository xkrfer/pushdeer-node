import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AppleLoginDto {
  @ApiProperty({ description: 'apple登录返回的凭证', example: 'xxxxx' })
  @IsNotEmpty({ message: 'idToken不允许为空' })
  idToken: string;
}
