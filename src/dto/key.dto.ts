import { AuthDto } from './auth.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';

export class GenKeyDto extends AuthDto {}

export class RemoveKeyDto extends AuthDto {
  @ApiProperty({ description: 'Key ID', example: 'xxxxx', required: true })
  @Matches(/^\+?[1-9][0-9]*$/, { message: 'key id错误' })
  id: number;
}

export class ReGenKeyDto extends AuthDto {
  @ApiProperty({ description: 'Key ID', example: 'xxxxx', required: true })
  @Matches(/^\+?[1-9][0-9]*$/, { message: 'key id错误' })
  id: number;
}

export class ListKeyDto extends AuthDto {}

export class RenameKeyDto extends AuthDto {
  @ApiProperty({ description: 'Key ID', example: 'xxxxx', required: true })
  @Matches(/^\+?[1-9][0-9]*$/, { message: 'key id错误' })
  id: number;

  @ApiProperty({ description: 'Key新名称', example: 'xxxxx', required: true })
  @IsNotEmpty({ message: 'name不允许为空' })
  name: string;
}
