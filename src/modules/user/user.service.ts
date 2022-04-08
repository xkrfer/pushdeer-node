import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PushDeerUsers } from '../../entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(PushDeerUsers)
    private readonly usersRepository: Repository<PushDeerUsers>,
  ) {}

  async findOne(uid: string, type: 'apple' | 'github') {
    const properties = {};
    if (type === 'apple') {
      properties['apple_id'] = uid;
    } else if (type === 'github') {
      properties['github_id'] = uid;
    }
    return this.usersRepository.findOne(properties);
  }

  async saveUser(user: PushDeerUsers) {
    return this.usersRepository.save(user).catch((err) => {
      throw err;
    });
  }
}
