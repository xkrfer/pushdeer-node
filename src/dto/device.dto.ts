import { ApiProperty } from '@nestjs/swagger';
import { AuthDto } from './auth.dto';

export class UpdateDeviceDto extends AuthDto {
  @ApiProperty({ description: '设备名', example: 'iPhone', required: true })
  name: string;
  @ApiProperty({ description: 'device token（推送用）', example: 'xxxxxxxxxxxxxxx', required: true })
  device_id: string;
  @ApiProperty({ description: '是否为轻应用，1为轻应用，0则不是', example: 0, required: false })
  is_clip: 0 | 1;
  @ApiProperty({ description: '应用类型', example: 'ios', required: false })
  type: string;
}

export class ListDeviceDto extends AuthDto {
}

export class RemoveDeviceDto extends AuthDto {
  @ApiProperty({ description: '设备id', example: 'xxxx', required: true })
  id: number;
}

export class RenameDeviceDto extends AuthDto {
  @ApiProperty({ description: '设备id', example: 1, required: true })
  id: number;

  @ApiProperty({ description: '设备名', example: 'iPhone SE', required: true })
  name: string;
}
