import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, MoreThan, Repository } from 'typeorm';
import { PushDeerMessages } from '../../entity/message.entity';
import {
  ListMessageDto,
  ListMessageV2Dto,
  PushMessageDto,
  RemoveMessageDto,
} from '../../dto/message.dto';
import { Code, Utils } from '../../helpers/utils';
import { PushDeerKeys } from '../../entity/keys.entity';
import { PushDeerDevices } from '../../entity/devices.entity';
import { PushDeerUsers } from '../../entity/users.entity';
import { sendToiOS } from '../../helpers/send';
import { MAX_PUSH_KEY_PER_TIME } from '../../helpers/config';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(PushDeerMessages)
    private readonly messagesRepository: Repository<PushDeerMessages>,
    @InjectRepository(PushDeerKeys)
    private readonly keysRepository: Repository<PushDeerKeys>,
    @InjectRepository(PushDeerDevices)
    private readonly devicesRepository: Repository<PushDeerDevices>,
  ) {}

  async push(pushMessage: PushMessageDto) {
    const { desp, type = 'markdown', text, pushkey } = pushMessage;
    const keys = Array.from(new Set(pushkey.split(',').map((x) => x.trim())));
    const result: any = [];

    if (keys.length > Number(MAX_PUSH_KEY_PER_TIME)) {
      keys.splice(MAX_PUSH_KEY_PER_TIME);
    }

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
        switch (type) {
          case 'markdown':
            pushMessage.html = Utils.renderMd(desp);
            break;
          case 'image':
            pushMessage.html = `<img src="${desp}" alt="${text}"/>`;
            break;
          case 'text':
          default:
            pushMessage.html = text;
        }
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

  async runToDevice(
    key: PushDeerKeys,
    sendType: string,
    text: string,
  ): Promise<any[]> {
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

    throw new HttpException(
      {
        code: Code.ARGS,
        error: `没有可用的设备，请先注册(key name:${key.name})`,
      },
      200,
    );
  }

  async getListV2(listMessage: ListMessageV2Dto, user: PushDeerUsers) {
    const { page = 1, pageSize = 10, keyword = '' } = listMessage;
    return await this.messagesRepository.findAndCount({
      select: [
        'id',
        'uid',
        'text',
        'desp',
        'type',
        'html',
        'pushkey_name',
        'created_at',
      ],
      where: {
        uid: user.uid,
        text: ILike(`%${keyword}%`),
      },
      order: {
        id: 'DESC',
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
  }

  async ping(user: PushDeerUsers) {
    const data = await this.messagesRepository.findOne({
      select: ['id', 'text', 'type'],
      where: {
        uid: user.uid,
      },
      order: {
        id: 'DESC',
      },
    });

    return {
      id: data?.id ?? 0,
      text: data?.type === 'image' ? '[图片]' : data?.text ?? '',
    };
  }
}
