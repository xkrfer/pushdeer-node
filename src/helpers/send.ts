import { UpdateDeviceDto } from '../dto/device.dto';
import { request } from './request';
import * as webpush from 'web-push';

import {
  GO_RUSH_IOS_CLIP_PORT,
  GO_RUSH_IOS_CLIP_TOPIC,
  GO_RUSH_IOS_PORT,
  GO_RUSH_IOS_TOPIC,
  GO_RUSH_ADDRESS,
  FCM_API_KEY,
  FCM_PRIVATE_KEY,
  FCM_PUBLIC_KEY,
} from './config';
import { Logger } from '@nestjs/common';

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

const logger = new Logger('send');

export async function sendToiOS(
  is_clip: UpdateDeviceDto['is_clip'],
  device_id: UpdateDeviceDto['device_id'],
  message: string,
) {
  const topic = is_clip === 0 ? GO_RUSH_IOS_TOPIC : GO_RUSH_IOS_CLIP_TOPIC;
  const port = is_clip === 0 ? GO_RUSH_IOS_PORT : GO_RUSH_IOS_CLIP_PORT;
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

if (FCM_API_KEY && FCM_PRIVATE_KEY && FCM_PUBLIC_KEY) {
  webpush.setGCMAPIKey(FCM_API_KEY);
  webpush.setVapidDetails(
    'mailto:your_email@example.com',
    FCM_PUBLIC_KEY,
    FCM_PRIVATE_KEY,
  );
}

export async function sendByFCM(pushSubscription: string, message: string) {
  if (!pushSubscription || !(FCM_API_KEY && FCM_PRIVATE_KEY && FCM_PUBLIC_KEY))
    return;
  try {
    await webpush.sendNotification(JSON.parse(pushSubscription), message);
  } catch (err) {
    logger.error('sendByFCM error', err);
  }
}
