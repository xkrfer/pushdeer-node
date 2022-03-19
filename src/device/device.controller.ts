import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { DeviceService } from './device.service';
import { ListDeviceDto, RemoveDeviceDto, RenameDeviceDto, UpdateDeviceDto } from '../dto/device.dto';


@Controller('device')
export class DeviceController {
  constructor(
    private readonly deviceService: DeviceService,
  ) {
  }

  @ApiOperation({ summary: '设备注册' })
  @Post('/reg')
  @HttpCode(200)
  async createDevice(@Body() body: UpdateDeviceDto) {
    const device = await this.deviceService.updateOrCreate(body);
    return {
      code: 0,
      content: {
        devices: [
          device,
        ],
      },
    };
  }


  @ApiOperation({ summary: '设备列表' })
  @Post('/list')
  @HttpCode(200)
  async listDevice(@Body() body: ListDeviceDto) {
    const devices = await this.deviceService.findAll(body);
    return {
      code: 0,
      content: {
        devices,
      },
    };
  }

  @ApiOperation({ summary: '重命名设备' })
  @Post('/rename')
  @HttpCode(200)
  async renameDevice(@Body() body: RenameDeviceDto) {
    const status = await this.deviceService.renameDevice(body);
    if (status) {
      return {
        code: 0,
        content: {
          message: 'done',
        },
      };
    }
    return {
      code: 80501,
      content: '设备不存在或已注销',
    };
  }

  @ApiOperation({ summary: '移除设备' })
  @Post('/remove')
  @HttpCode(200)
  async removeDevice(@Body() body: RemoveDeviceDto) {
    const status = await this.deviceService.removeDevice(body);
    if (status) {
      return {
        code: 0,
        content: {
          message: 'done',
        },
      };
    }
    return {
      code: 80501,
      content: '设备不存在或已注销',
    };
  }


}
