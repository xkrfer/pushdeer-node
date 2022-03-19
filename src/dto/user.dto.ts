import { ApiProperty } from '@nestjs/swagger';
import { AuthDto } from './auth.dto';

export class UserInfoDto extends AuthDto {

}

export class UserDto {
  @ApiProperty({ description: '是否自建微信登录', example: 0 })
  self_hosted: number;

  @ApiProperty({ description: '微信登录code', example: 'xxxxx' })
  code: string;

  @ApiProperty({ description: 'apple登录返回的凭证', example: 'xxxxx' })
  idToken: string;
}
