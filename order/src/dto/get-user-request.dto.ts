export class GetUserRequest {
  constructor(public readonly user_id: string) {}

  toString() {
    return JSON.stringify({
      user_id: this.user_id,
    });
  }
}
