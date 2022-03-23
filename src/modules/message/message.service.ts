import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { PushDeerMessages } from '../../entity/message.entity';
import {
  ListMessageDto,
  PushMessageDto,
  RemoveMessageDto,
} from '../../dto/message.dto';
import { Code, Utils } from '../../helpers/utils';
import { PushDeerKeys } from '../../entity/keys.entity';
import { PushDeerDevices } from '../../entity/devices.entity';
import { PushDeerUsers } from '../../entity/users.entity';
import { sendToiOS } from '../../helpers/send';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(PushDeerMessages)
    private readonly messagesRepository: Repository<PushDeerMessages>,
    @InjectRepository(PushDeerKeys)
    private readonly keysRepository: Repository<PushDeerKeys>,
    @InjectRepository(PushDeerDevices)
    private readonly devicesRepository: Repository<PushDeerDevices>,
  ) {
  }

  async push(pushMessage: PushMessageDto) {
    const { desp, type = 'markdown', text, pushkey } = pushMessage;
    const keys = Utils.unique(pushkey.split(','));
    const result: any = [];
    // TODO:// 限制keys的数量
    for (let i = 0; i < keys.length; i++) {
      const key = await this.keysRepository.findOne({
        key: keys[i],
      });
      if (key) {
        const pushMessage = new PushDeerMessages();
        pushMessage.uid = key.uid;
        pushMessage.readkey = Utils.randomUUID();
        pushMessage.text = text;
        pushMessage.desp = desp;
        pushMessage.type = type;
        pushMessage.pushkey_name = key.name;
        await this.messagesRepository.save(pushMessage);
        const res = await this.runToDevice(key, type, text);
        result.push(...res);
      }
    }
    return {
      result,
    };
  }

  async list(listMessage: ListMessageDto, user: PushDeerUsers) {
    const { limit = 10, since_id = 0 } = listMessage;
    return await this.messagesRepository.find({
      select: [
        'id',
        'uid',
        'text',
        'desp',
        'type',
        'pushkey_name',
        'created_at',
      ],
      where: {
        uid: user.uid,
        id: MoreThan(since_id),
      },
      order: {
        id: 'DESC',
      },
      take: limit,
    });
  }

  async remove(removeMessage: RemoveMessageDto, user: PushDeerUsers) {
    const { id } = removeMessage;
    const { affected } = await this.messagesRepository.delete({
      id,
      uid: user.uid,
    });
    return affected;
  }

  async runToDevice(key: PushDeerKeys, sendType: string, text: string): Promise<any[]> {
    const devices = await this.devicesRepository.find({
      uid: key.uid,
    });
    if (devices) {
      const result: any = [];
      const sendText = sendType === 'image' ? '[图片]' : text;
      for (let i = 0; i < devices.length; i++) {
        const { type, device_id, is_clip } = devices[i];
        if (type === 'ios') {
          const res = await sendToiOS(is_clip, device_id, sendText);
          result.push(res);
        }
      }
      return result;
    }

    throw new HttpException({
      code: Code.ARGS,
      error: `没有可用的设备，请先注册(key name:${key.name})`,
    }, 200);
  }
}
