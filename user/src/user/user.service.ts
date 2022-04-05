import { Injectable } from '@nestjs/common';
import { GetUserRequest } from 'src/dto/get-user-request.dto';

@Injectable()
export class UserService {
  private readonly users: any[] = [
    {
      id: '19abf07c-308e-4091-b909-5c857a21a20a',
      username: 'William',
    },
    {
      id: '600cb256-8f4b-4fbe-8f6b-a9f9b4528496',
      username: 'Kate',
    },
    {
      id: 'b1d0bdfe-a3c2-4f20-a663-785b68dc095a',
      username: 'Karl',
    },
  ];

  getUser(getUserRequest: GetUserRequest) {
    return this.users.find((user) => user.id === getUserRequest.user_id);
  }
}
