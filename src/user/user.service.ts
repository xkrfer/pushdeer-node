import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PushDeerUsers } from '../entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(PushDeerUsers)
    private readonly usersRepository: Repository<PushDeerUsers>,
  ) {}

  async findOne(uid: string, type: 'apple_id' | 'wechat_id' = 'apple_id') {
    return this.usersRepository.findOne({
      [type]: uid,
    });
  }

  async saveUser(user: PushDeerUsers) {
    return this.usersRepository.save(user).catch((err) => {
      throw err;
    });
  }

  createToken() {
    return '4deec322e7ad4fafa4804222cc132853'
    // return randomUUID().replace(/-/g, '');
  }
}
