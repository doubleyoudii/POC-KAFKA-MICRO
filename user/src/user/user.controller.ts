import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @MessagePattern('get_user')
  getUser(data: any) {
    return this.userService.getUser(data.value);
  }
}
