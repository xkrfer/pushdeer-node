import {
  Controller,
  HttpCode,
  Post,
  Body,
  Session,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { DeviceService } from './device.service';
import {
  BindDeviceFCMDto,
  ListDeviceDto,
  RemoveDeviceDto,
  RenameDeviceDto,
  UpdateDeviceDto,
} from '../../dto/device.dto';
import { Code } from '../../helpers/utils';
import { AuthGuard } from '../../global/guard/auth.guard';

@Controller('device')
@UseGuards(AuthGuard)
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @ApiOperation({ summary: '设备注册' })
  @Post('reg')
  @HttpCode(200)
  async createDevice(@Body() body: UpdateDeviceDto, @Session() session) {
    const device = await this.deviceService.updateOrCreate(body, session.user);
    return {
      code: Code.DONE,
      data: {
        devices: [device],
      },
    };
  }

  @ApiOperation({ summary: '设备列表' })
  @Post('list')
  @HttpCode(200)
  async listDevice(@Body() body: ListDeviceDto, @Session() session) {
    const devices = await this.deviceService.findAll(session.user);
    return {
      code: Code.DONE,
      data: {
        devices,
      },
    };
  }

  @ApiOperation({ summary: '重命名设备' })
  @Post('rename')
  @HttpCode(200)
  async renameDevice(@Body() body: RenameDeviceDto, @Session() session) {
    const status = await this.deviceService.renameDevice(body, session.user);
    return {
      code: status ? Code.DONE : Code.ARGS,
      error: '设备不存在或已注销',
    };
  }

  @ApiOperation({ summary: '移除设备' })
  @Post('remove')
  @HttpCode(200)
  async removeDevice(@Body() body: RemoveDeviceDto, @Session() session) {
    const status = await this.deviceService.removeDevice(body, session.user);
    return {
      code: status ? Code.DONE : Code.ARGS,
      error: '设备不存在或已注销',
    };
  }

  @ApiOperation({ summary: '绑定FCM推送信息，仅为chrome插件使用' })
  @Post('bind/fcm')
  @HttpCode(200)
  async bindFCM(@Body() body: BindDeviceFCMDto, @Session() session) {
    const status = await this.deviceService.removeDevice(body, session.user);
    return {
      code: status ? Code.DONE : Code.ARGS,
      error: '设备不存在或已注销',
    };
  }
}
