export class OrderSetEvent {
  constructor(
    public readonly user_id: string,
    public readonly market_id: string,
    public readonly method: string,
    public readonly quantity: number,
  ) {}

  toString() {
    return JSON.stringify({
      user_id: this.user_id,
      market_id: this.market_id,
      method: this.method,
      quantity: this.quantity,
    });
  }
}
