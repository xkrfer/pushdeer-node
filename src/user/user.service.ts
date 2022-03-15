import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { PushDeerUsers } from "../entity/users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(PushDeerUsers)
    private readonly usersRepository: Repository<PushDeerUsers>,
    private readonly jwtService: JwtService
  ) {
  }

  async findOne(
    uid: string,
    type: "apple_id" | "wechat_id" = "apple_id"
  ) {
    return this.usersRepository.findOne({
      [type]: uid
    });
  }

  async saveUser(user: PushDeerUsers) {
    return this.usersRepository.save(user).catch((err) => {
      throw err;
    });
  }

  async createToken(user: PushDeerUsers) {
    const { id, name, apple_id, wechat_id, email, level, created_at, updated_at } = user;
    return this.jwtService.sign({
      id, name, apple_id, wechat_id, email, level, created_at, updated_at
    });
  }
}
