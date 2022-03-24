import { UpdateDeviceDto } from '../dto/device.dto';
import { request } from './request';
import {
  GO_PUSH_IOS_CLIP_PORT,
  GO_PUSH_IOS_CLIP_TOPIC,
  GO_PUSH_IOS_PORT,
  GO_PUSH_IOS_TOPIC,
  GO_RUSH_ADDRESS,
} from './config';


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


export async function sendToiOS(
  is_clip: UpdateDeviceDto['is_clip'],
  device_id: UpdateDeviceDto['device_id'],
  message: string,
) {
  const topic = is_clip === 0 ? GO_PUSH_IOS_TOPIC : GO_PUSH_IOS_CLIP_TOPIC;
  const port = is_clip === 0 ? GO_PUSH_IOS_PORT : GO_PUSH_IOS_CLIP_PORT;
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
    url: `http://${GO_RUSH_ADDRESS}:${port}/api/push`,
    method: 'POST',
    data: notification,
  });
  return JSON.stringify(response.data);
}
