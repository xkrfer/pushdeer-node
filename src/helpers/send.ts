import { UpdateDeviceDto } from '../dto/device.dto';
import getConfig from '../config/configuration';
import { request } from './request';

export interface SendReady {
  is_clip: 0 | 1,
  device_id: string,
  type: 'ios'
}

interface AppleNotifications {
  tokens: string[];
  platform: number;
  message: string;
  production: boolean;
  topic: string;
  volume: number;
}

interface AppleSendInterface {
  notifications: AppleNotifications[];
}

const {
  address = 'http://127.0.0.1',
  ios_topic = 'com.pushdeer.self.ios',
  clip_topic = 'com.pushdeer.self.ios.Clip',
  ios_port = 8888,
  clip_port = 8889,
} = getConfig().go_push;

export async function sendToiOS(
  is_clip: UpdateDeviceDto['is_clip'],
  device_id: UpdateDeviceDto['device_id'],
  message: string,
) {
  const topic = is_clip === 0 ? ios_topic : clip_topic;
  const port = is_clip === 0 ? ios_port : clip_port;
  const notification: AppleSendInterface = {
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
  const response = await request({
    url: `${address}:${port}/api/push`,
    method: 'POST',
    data: notification,
  });
  return JSON.stringify(response.data);
}
