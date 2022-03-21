import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    description: '认证token',
    example: 'it is token',
    required: true,
  })
  @IsNotEmpty({ message: 'token不允许为空' })
  token: string;
}
