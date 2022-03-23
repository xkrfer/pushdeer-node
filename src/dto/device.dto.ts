import { ApiProperty } from '@nestjs/swagger';
import { AuthDto } from './auth.dto';
import { IsNotEmpty, IsOptional, Matches } from 'class-validator';

export class UpdateDeviceDto extends AuthDto {
  @ApiProperty({ description: '设备名', example: 'iPhone', required: true })
  @IsNotEmpty({ message: 'name不允许为空' })
  name: string;

  @ApiProperty({
    description: 'device token（推送用）',
    example: 'xxxxxxxxxxxxxxx',
    required: true,
  })
  @IsNotEmpty({ message: 'device_id不允许为空' })
  device_id: string;

  @ApiProperty({
    description: '是否轻应用,0为轻应用，1为App',
    default: 0,
    example: 0,
    required: false,
  })
  @IsOptional()
  @Matches(/^[01]$/, { message: 'is_clip值错误' })
  is_clip: 0 | 1;

  @ApiProperty({
    description: '应用类型,可选值：ios',
    default: 'ios',
    example: 'ios',
    required: false,
  })
  @IsOptional()
  @Matches(/^(\s)(|ios)$/, { message: 'type:应用类型错误' })
  type: 'ios';
}

export class ListDeviceDto extends AuthDto {}

export class RemoveDeviceDto extends AuthDto {
  @ApiProperty({ description: '设备id', example: 'xxxx', required: true })
  @Matches(/^\+?[1-9][0-9]*$/, { message: '设备id错误' })
  id: number;
}

export class RenameDeviceDto extends AuthDto {
  @ApiProperty({ description: '设备id', example: 1, required: true })
  @Matches(/^\+?[1-9][0-9]*$/, { message: '设备id错误' })
  id: number;

  @ApiProperty({ description: '设备名', example: 'iPhone SE', required: true })
  @IsNotEmpty({ message: 'name不允许为空' })
  name: string;
}
