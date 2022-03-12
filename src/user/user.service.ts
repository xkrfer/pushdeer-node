import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PushDeerUsers } from '../entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(PushDeerUsers)
    private readonly usersRepository: Repository<PushDeerUsers>,
  ) {
  }

  async loginFakeUser() {
    const fakeUser = {
      uid: 'JQV8hchTz7YP64sE',
      email: 'fake@gmail.com',
    };
    const user = await this.findOne(fakeUser.uid);
    if (!user) {
      await this.createAppleIdUser(fakeUser);
    }

    return {}
  }

  async createAppleIdUser(createUserDto: CreateUserDto): Promise<PushDeerUsers> {
    const user = new PushDeerUsers();
    const { email } = createUserDto;
    user.email = createUserDto.email;
    user.name = email.split('@')[0];
    user.apple_id = createUserDto.uid;
    user.level = 1;
    return this.usersRepository.save(user);
  }

  async findOne(uid: string, type: 'apple_id' | 'wechat_id' = 'apple_id') {
    return this.usersRepository.findOne({
      [type]: uid,
    });
  }
}
