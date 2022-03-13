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

  async fakeLogin() {
    const fakeUser = {
      uid: 'JQV8hchTz7YP64sE',
      email: 'fake@gmail.com',
    };
    const user = await this.findOne(fakeUser.uid);
    if (!user) {
      const pushDeerUser = new PushDeerUsers();
      pushDeerUser.email = fakeUser.email;
      pushDeerUser.name = fakeUser.email.split('@')[0];
      pushDeerUser.apple_id = fakeUser.uid;
      pushDeerUser.level = 1;
      await this.usersRepository.save(pushDeerUser).catch((err) => {
        throw err;
      });
    }
    return UserService.createToken();
  }

  private async findOne(
    uid: string,
    type: 'apple_id' | 'wechat_id' = 'apple_id',
  ) {
    return this.usersRepository.findOne({
      [type]: uid,
    });
  }

  private static async createToken() {
    return randomUUID().replace(/-/g, '');
  }
}
