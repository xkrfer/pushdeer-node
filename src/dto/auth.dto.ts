import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ description: '认证token', example: 'it is token', required: true })
  token: string;
}
