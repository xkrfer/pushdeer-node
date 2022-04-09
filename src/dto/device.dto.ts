import { ApiProperty } from '@nestjs/swagger';
import { AuthDto } from './auth.dto';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

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
    description: '是否轻应用,1为轻应用，0为App',
    default: 0,
    example: 0,
    required: false,
  })
  @IsOptional()
  @IsEnum([0, 1], { message: 'is_clip值错误' })
  @Type(() => Number)
  is_clip: 0 | 1;

  @ApiProperty({
    description: '应用类型,可选值：ios',
    default: 'ios',
    example: 'ios',
    required: false,
  })
  @IsOptional()
  @IsEnum(['ios', 'github'], { message: 'type值错误' })
  type: 'ios' | 'github';
}

export class ListDeviceDto extends AuthDto {}

export class RemoveDeviceDto extends AuthDto {
  @ApiProperty({ description: '设备id', example: 'xxxx', required: true })
  @IsNumber({}, { message: '设备id错误' })
  id: number;
}

export class RenameDeviceDto extends AuthDto {
  @ApiProperty({ description: '设备id', example: 1, required: true })
  @IsNumber({}, { message: '设备id错误' })
  id: number;

  @ApiProperty({ description: '设备名', example: 'iPhone SE', required: true })
  @IsNotEmpty({ message: 'name不允许为空' })
  name: string;
}
