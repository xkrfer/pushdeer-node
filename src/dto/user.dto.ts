import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @ApiProperty({ description: '是否自建微信登录', example: 0 })
  self_hosted: number;

  @ApiProperty({ description: '微信登录code', example: 'xxxxx' })
  code: string;

}

export class AppleLoginDto {
  @ApiProperty({ description: 'apple登录返回的凭证', example: 'xxxxx' })
  @IsNotEmpty({ message: 'idToken不允许为空' })
  idToken: string;
}
