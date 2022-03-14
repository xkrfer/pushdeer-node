import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { PushDeerUsers } from "../entity/users.entity";

@Injectable()
export class LoginService {
  constructor(
    private readonly userService: UserService
  ) {
  }

  async fakeLogin() {
    const fakeUser = {
      uid: "JQV8hchTz7YP64sE",
      email: "fake@gmail.com"
    };
    let user = await this.userService.findOne(fakeUser.uid);
    if (!user) {
      const pushDeerUser = new PushDeerUsers();
      pushDeerUser.email = fakeUser.email;
      pushDeerUser.name = fakeUser.email.split("@")[0];
      pushDeerUser.apple_id = fakeUser.uid;
      pushDeerUser.level = 1;
      user = await this.userService.saveUser(pushDeerUser);
    }
    return this.userService.createToken(user);
  }
}
