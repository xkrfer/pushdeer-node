import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PushDeerKeys } from '../../entity/keys.entity';
import { GenKeyDto, ListKeyDto, ReGenKeyDto, RemoveKeyDto, RenameKeyDto } from '../../dto/key.dto';
import { sessionMap } from '../../constant';
import { randomUUID } from 'crypto';
import { PushDeerUsers } from '../../entity/users.entity';
import { Utils } from '../../helpers/utils';

@Injectable()
export class KeyService {
  constructor(
    @InjectRepository(PushDeerKeys)
    private readonly keysRepository: Repository<PushDeerKeys>,
  ) {
  }

  async gen(genKey: GenKeyDto, user: PushDeerUsers) {
    const name = `Key${Utils.randomUUID(8)}`;
    const key = `PDU${user.id}T${Utils.randomUUID()}`;
    await this.keysRepository.save({
      uid: user.id,
      name,
      key,
    });
    return await this.list(user);
  }

  async list(user: PushDeerUsers) {
    return await this.keysRepository.find({
      uid: user.id,
    });
  }

  async rename(renameKey: RenameKeyDto, user: PushDeerUsers) {
    const { id, name } = renameKey;
    return await this.keysRepository.update({
      id,
      uid: user.id,
    }, {
      name,
    });
  }

  async remove(removeKey: RemoveKeyDto, user: PushDeerUsers) {
    const { id } = removeKey;
    return await this.keysRepository.delete({
      id,
      uid: user.id,
    });
  }

  async regen(regenKey: ReGenKeyDto, user: PushDeerUsers) {
    const { id } = regenKey;
    const key = `PDU${user.id}T${randomUUID().replace(/-/g, '')}`;
    return await this.keysRepository.update({
      id,
      uid: user.id,
    }, {
      key,
    });
  }
}
