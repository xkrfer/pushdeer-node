import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PushDeerUsers } from '../entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';


const logger = new Logger();

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(PushDeerUsers)
    private readonly usersRepository: Repository<PushDeerUsers>,
    private readonly jwtService: JwtService,
  ) {
  }

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
      const saveUser = await this.usersRepository.save(pushDeerUser).catch((err) => {
        throw  err;
      });
      return this.createToken(saveUser);
    }
    return this.createToken(user);
  }


  private async findOne(uid: string, type: 'apple_id' | 'wechat_id' = 'apple_id') {
    return this.usersRepository.findOne({
      [type]: uid,
    });
  }

  private async createToken(user: PushDeerUsers) {
    return this.jwtService.sign({
      apple_id: user.apple_id,
      wechat_id: user.wechat_id,
    });
  }

}
