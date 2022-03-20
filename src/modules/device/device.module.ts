import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PushDeerDevices } from '../../entity/devices.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PushDeerDevices])],
  controllers: [DeviceController],
  providers: [DeviceService]
})
export class DeviceModule {}
