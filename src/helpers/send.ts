import { UpdateDeviceDto } from '../dto/device.dto';
import getConfig from '../config/configuration';

interface Notifications {
  tokens: string[];
  platform: number;
  message: string;
  production: boolean;
  topic: string;
  volume: number;
}

interface RootSendInterface {
  notifications: Notifications[];
}

export function sendToiOS(
  is_clip: UpdateDeviceDto['is_clip'],
  device_id: UpdateDeviceDto['device_id'],
  message: string,
) {
  const gorush = getConfig().gorush;
  const topic = is_clip === 0 ? gorush.ios_topic : gorush.clip_topic;
  const notification: RootSendInterface = {
    notifications: [
      {
        tokens: [device_id],
        platform: 1,
        message,
        production: true,
        topic,
        volume: 2.0,
      },
    ],
  };

  console.log(is_clip, device_id, message);
}
