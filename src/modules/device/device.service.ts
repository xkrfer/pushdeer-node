import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PushDeerDevices } from '../../entity/devices.entity';
import { Repository } from 'typeorm';
import { sessionMap } from '../../constant';
import { RemoveDeviceDto, RenameDeviceDto, UpdateDeviceDto } from '../../dto/device.dto';
import { PushDeerUsers } from '../../entity/users.entity';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(PushDeerDevices)
    private readonly devicesRepository: Repository<PushDeerDevices>,
  ) {
  }

  async updateOrCreate(updateDevice: UpdateDeviceDto, user: PushDeerUsers) {
    let device = await this.devicesRepository.findOne({ uid: user.id, device_id: updateDevice.device_id });
    console.log(updateDevice);
    if (!device) {
      const pushDevice = new PushDeerDevices();
      pushDevice.uid = user.id;
      pushDevice.name = updateDevice.name;
      pushDevice.device_id = updateDevice.device_id;
      pushDevice.type = updateDevice.type ?? 'ios';
      pushDevice.is_clip = updateDevice.is_clip ?? 0;
      device = await this.devicesRepository.save(pushDevice);
    }
    return device;
  }

  async findAll(user: PushDeerUsers) {
    return await this.devicesRepository.find({
      uid: user.id,
    });
  }

  async renameDevice(renameDevice: RenameDeviceDto, user: PushDeerUsers) {
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

  async removeDevice(removeDevice: RemoveDeviceDto, user: PushDeerUsers) {
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
