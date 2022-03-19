import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PushDeerDevices } from '../entity/devices.entity';
import { Repository } from 'typeorm';
import { sessionMap } from '../constant';
import { ListDeviceDto, RemoveDeviceDto, RenameDeviceDto, UpdateDeviceDto } from '../dto/device.dto';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(PushDeerDevices)
    private readonly devicesRepository: Repository<PushDeerDevices>,
  ) {
  }

  async updateOrCreate(updateDevice: UpdateDeviceDto) {
    const { token, ...rest } = updateDevice;
    // 先判断用户存不存在 这里实际上可以用守卫去做
    const user = sessionMap.get(token);
    let device = await this.devicesRepository.findOne({ uid: user.id, device_id: updateDevice.device_id });
    if (!device) {
      device = await this.devicesRepository.save({
        uid: user.id,
        device_id: updateDevice.device_id,
        type: updateDevice.type ?? 'ios',
        name: updateDevice.name,
        is_clip: updateDevice.is_clip ?? 0,
      });
    }
    return device;
  }

  async findAll(listDevice: ListDeviceDto) {
    const { token } = listDevice;
    const user = sessionMap.get(token);
    return await this.devicesRepository.find({
      uid: user.id,
    });
  }

  async renameDevice(renameDevice: RenameDeviceDto) {
    const { token } = renameDevice;
    const user = sessionMap.get(token);
    const device = await this.devicesRepository.findOne({
      id: renameDevice.id,
    });
    if (device && device.uid === user.id) {
      await this.devicesRepository.update(device.id, {
        name: renameDevice.name,
      });
      return true;
    }
    return false;
  }

  async removeDevice(removeDevice: RemoveDeviceDto) {
    const { token } = removeDevice;
    const user = sessionMap.get(token);
    const device = await this.devicesRepository.findOne({
      uid: user.id,
      id: removeDevice.id,
    });
    if (device) {
      await this.devicesRepository.delete(device.id);
      return true;
    }
    return false;
  }
}
