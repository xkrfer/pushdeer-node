import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PushDeerKeys } from '../../entity/keys.entity';
import {
  GenKeyDto,
  ReGenKeyDto,
  RemoveKeyDto,
  RenameKeyDto,
} from '../../dto/key.dto';
import { randomUUID } from 'crypto';
import { PushDeerUsers } from '../../entity/users.entity';
import { Utils } from '../../helpers/utils';

@Injectable()
export class KeyService {
  constructor(
    @InjectRepository(PushDeerKeys)
    private readonly keysRepository: Repository<PushDeerKeys>,
  ) {}

  async gen(genKey: GenKeyDto, user: PushDeerUsers) {
    const name = `Key${Utils.randomUUID(8)}`;
    const key = `PDU${user.uid}T${Utils.randomUUID()}`;
    await this.keysRepository.save({
      uid: user.uid,
      name,
      key,
    });
    return await this.list(user);
  }

  async list(user: PushDeerUsers) {
    return await this.keysRepository.find({
      uid: user.uid,
    });
  }

  async rename(renameKey: RenameKeyDto, user: PushDeerUsers) {
    const { id, name } = renameKey;
    return await this.keysRepository.update(
      {
        id,
        uid: user.uid,
      },
      {
        name,
      },
    );
  }

  async remove(removeKey: RemoveKeyDto, user: PushDeerUsers) {
    const { id } = removeKey;
    return await this.keysRepository.delete({
      id,
      uid: user.uid,
    });
  }

  async regen(regenKey: ReGenKeyDto, user: PushDeerUsers) {
    const { id } = regenKey;
    const key = `PDU${user.uid}T${randomUUID().replace(/-/g, '')}`;
    return await this.keysRepository.update(
      {
        id,
        uid: user.uid,
      },
      {
        key,
      },
    );
  }
}
